import { DAYS_MAP } from './constants';
import { WeeklyAvailability, AvailabilityException, TimeSlot } from '../types/availability';
import { parse, isAfter, isBefore, format, isSameDay } from 'date-fns';
import { supabase } from '../lib/supabase';

import { toIST, formatISTDate } from './dateTime';
import { TIME_SLOTS } from './timeSlots'; 


const DEBUG = import.meta.env.VITE_DEV_MODE === 'true';

// Cache for availability checks
const availabilityCache = new Map<string, { result: boolean; expiry: number }>();
const CACHE_TTL = 30000; // 30 seconds

// Batch cache for appointments
const appointmentCache = new Map<string, { appointments: any[]; expiry: number }>();
const APPOINTMENT_CACHE_TTL = 30000; // 30 seconds

export const clearAvailabilityCache = (doctorId?: string) => {
  if (doctorId) {
    // Clear specific doctor's cache entries
    for (const [key] of availabilityCache) {
      if (key.includes(doctorId)) {
        availabilityCache.delete(key);
      }
    }
    // Clear appointment cache for doctor
    for (const [key] of appointmentCache) {
      if (key.includes(doctorId)) {
        appointmentCache.delete(key);
      }
    }
  } else {
    // Clear all cache
    availabilityCache.clear();
    appointmentCache.clear();
  }
};

export const isTimeSlotAvailable = async (
  date: Date,
  time: string,
  doctorId: string,
  weeklySchedule: WeeklyAvailability,
  exceptions: AvailabilityException[]
): Promise<boolean> => {
  const cacheKey = `availability_${doctorId}_${date.toISOString()}_${time}`;
  const now = Date.now();

  const cached = availabilityCache.get(cacheKey);
  if (cached && now < cached.expiry) {
    return cached.result;
  }

  if (cached) {
    availabilityCache.delete(cacheKey);
  }

  try {
    const istDate = toIST(date);
    const now = toIST(new Date());

    // Check if date is in valid range
    const maxDate = new Date(now);
    maxDate.setDate(maxDate.getDate() + 30);

    if (istDate < now || istDate > maxDate) {
      return false;
    }

    // For same day bookings, check if time is past with buffer
    if (isSameDay(istDate, now)) {
      const [hours, minutes] = time.split(':').map(Number);
      const slotMinutes = hours * 60 + minutes;
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      if (slotMinutes <= currentMinutes + TIME_SLOTS.BUFFER) {
        return false;
      }
    }

    // Check exceptions
    const dateStr = formatISTDate(istDate);
    const exception = exceptions.find(e => e.date === dateStr);
    
    if (DEBUG) {
      console.log('Checking exceptions for date:', dateStr);
      console.log('Found exception:', exception);
    }

    if (exception) {
      if (exception.type === 'unavailable') return false;
      if (exception.type === 'custom' && exception.slots) {
        const isAvailable = isTimeInSlots(time, exception.slots);
        if (DEBUG) console.log('Custom slot availability:', isAvailable);
        return isAvailable;
      }
    }

    // Check weekly schedule
    const dayOfWeek = DAYS_MAP[istDate.getDay() as keyof typeof DAYS_MAP] as keyof WeeklyAvailability;
    const daySchedule = weeklySchedule[dayOfWeek];

    if (!daySchedule?.isAvailable) {
      return false;
    }
    
    if (!daySchedule.slots?.length) {
      return false;
    }

    // Get appointments from cache or fetch
    const appointmentCacheKey = `appointments_${doctorId}_${dateStr}`;
    let existingAppointments;

    const cachedAppointments = appointmentCache.get(appointmentCacheKey);
    if (cachedAppointments && now < cachedAppointments.expiry) {
      existingAppointments = cachedAppointments.appointments;
    } else {
      const { data } = await supabase
        .from('appointments')
        .select('appointment_time')
        .eq('doctor_id', doctorId)
        .eq('appointment_date', dateStr)
        .neq('status', 'cancelled');

      existingAppointments = data || [];
      
      // Cache appointments
      appointmentCache.set(appointmentCacheKey, {
        appointments: existingAppointments,
        expiry: now + APPOINTMENT_CACHE_TTL
      });
    }

    if (existingAppointments?.length) {
      const [bookingHours, bookingMinutes] = time.split(':').map(Number);
      const bookingMinutesTotal = bookingHours * 60 + bookingMinutes;

      const hasConflict = existingAppointments.some(apt => {
        const [aptHours, aptMinutes] = apt.appointment_time.split(':').map(Number);
        const aptMinutesTotal = aptHours * 60 + aptMinutes;
        return Math.abs(aptMinutesTotal - bookingMinutesTotal) < TIME_SLOTS.BUFFER;
      });

      if (hasConflict) {
        return false;
      }
    }

    // Final check against weekly schedule
    const result = isTimeInSlots(time, daySchedule.slots);

    // Cache the result
    availabilityCache.set(cacheKey, {
      result,
      expiry: now + CACHE_TTL
    });

    return result;
  } catch (error) {
    console.error('Error checking availability:', error);
    return false;
  }
};

const isTimeInSlots = (time: string, slots: TimeSlot[]): boolean => {
  const timeDate = parse(time, 'HH:mm', new Date());
  
  return slots.some(slot => {
    const startTime = parse(slot.startTime, 'HH:mm', new Date());
    const endTime = parse(slot.endTime, 'HH:mm', new Date());
    
    // Convert all times to minutes for easier comparison
    const timeMinutes = timeDate.getHours() * 60 + timeDate.getMinutes();
    const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
    const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();

    const isAvailable = timeMinutes >= startMinutes && timeMinutes <= endMinutes;

    return isAvailable;
  });
};