import { DAYS_MAP } from './constants';
import { WeeklyAvailability, AvailabilityException, TimeSlot } from '../types/availability';
import { supabase } from '../lib/supabase';

import { parse, isAfter, isBefore, format, isSameDay, addMinutes } from 'date-fns';
import { toIST, formatISTDate, getCurrentISTDate } from './dateTime';
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
    availabilityCache.clear();
    appointmentCache.clear();
    if (DEBUG) console.log('Cleared availability cache for doctor:', doctorId);
  } else {
    availabilityCache.clear();
    appointmentCache.clear();
    if (DEBUG) console.log('Cleared all availability caches');
  }
};

export const isTimeSlotAvailable = async (
  date: Date,
  time: string,
  doctorId: string,
  weeklySchedule: WeeklyAvailability,
  exceptions: AvailabilityException[]
): Promise<boolean> => {
  try {
    const istDate = toIST(date);
    const now = Date.now();

    // Check exceptions
    const dateStr = formatISTDate(istDate);
    const exception = exceptions.find(e => e.date === dateStr);
    
    if (exception) {
      if (exception.type === 'unavailable') return false;
      if (exception.type === 'custom' && exception.slots) {
        const isAvailable = isTimeInSlots(time, exception.slots);
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