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

export const isTimeSlotAvailable = async (
  date: Date,
  time: string,
  doctorId: string,
  weeklySchedule: WeeklyAvailability,
  exceptions: AvailabilityException[]
): Promise<boolean> => {
  const cacheKey = `availability_${doctorId}_${date.toISOString()}_${time}`;
  const now = Date.now();

  // Check cache
  const cached = availabilityCache.get(cacheKey);
  if (cached && now < cached.expiry) {
    if (DEBUG) console.log('Using cached availability result');
    return cached.result;
  }

  // Clear expired cache entry
  if (cached) {
    availabilityCache.delete(cacheKey);
  }

  try {
    if (DEBUG) console.log('Checking availability for:', { date, time, doctorId });

    const istDate = toIST(date);
    const now = toIST(new Date());

    // Check if date is in valid range
    const maxDate = new Date(now);
    maxDate.setDate(maxDate.getDate() + 30);

    if (istDate < now || istDate > maxDate) {
      if (DEBUG) console.log('Date out of range');
      return false;
    }

    // For same day bookings, check if time is past with buffer
    if (isSameDay(istDate, now)) {
      const [hours, minutes] = time.split(':').map(Number);
      const slotMinutes = hours * 60 + minutes;
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      if (slotMinutes <= currentMinutes + TIME_SLOTS.BUFFER) {
        if (DEBUG) console.log('Time slot is in past or within buffer');
        return false;
      }
    }

    // Check exceptions
    const dateStr = formatISTDate(istDate);
    const exception = exceptions.find(e => e.date === dateStr);

    if (exception) {
      if (exception.type === 'unavailable') return false;
      if (exception.type === 'custom' && exception.slots) {
        return isTimeInSlots(time, exception.slots);
      }
    }

    // Check weekly schedule
    const dayOfWeek = DAYS_MAP[istDate.getDay() as keyof typeof DAYS_MAP] as keyof WeeklyAvailability;
    const daySchedule = weeklySchedule[dayOfWeek];

    if (!daySchedule?.isAvailable) {
      if (DEBUG) console.log('Day not available in schedule');
      return false;
    }
    
    if (!daySchedule.slots?.length) {
      if (DEBUG) console.log('No slots defined for day');
      return false;
    }

    // Check existing appointments
    const { data: existingAppointments } = await supabase
      .from('appointments')
      .select('appointment_time')
      .eq('doctor_id', doctorId)
      .eq('appointment_date', dateStr)
      .neq('status', 'cancelled');

    if (existingAppointments?.length) {
      const [bookingHours, bookingMinutes] = time.split(':').map(Number);
      const bookingMinutesTotal = bookingHours * 60 + bookingMinutes;

      const hasConflict = existingAppointments.some(apt => {
        const [aptHours, aptMinutes] = apt.appointment_time.split(':').map(Number);
        const aptMinutesTotal = aptHours * 60 + aptMinutes;
        return Math.abs(aptMinutesTotal - bookingMinutesTotal) < TIME_SLOTS.BUFFER;
      });

      if (hasConflict) {
        if (DEBUG) console.log('Slot conflicts with existing appointment');
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
  if (DEBUG) {
    console.log('Checking time:', time, 'against slots:', JSON.stringify(slots, null, 2));
  }
  
  return slots.some(slot => {
    const startTime = parse(slot.startTime, 'HH:mm', new Date());
    const endTime = parse(slot.endTime, 'HH:mm', new Date());
    
    // Convert all times to minutes for easier comparison
    const timeMinutes = timeDate.getHours() * 60 + timeDate.getMinutes();
    const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
    const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();

    const isAvailable = timeMinutes >= startMinutes && timeMinutes <= endMinutes;

    if (DEBUG) {
      console.log('Slot:', {
        start: slot.startTime,
        end: slot.endTime,
        time,
        timeMinutes,
        startMinutes,
        endMinutes,
        isAvailable
      });
    }

    return isAvailable;
  });
};