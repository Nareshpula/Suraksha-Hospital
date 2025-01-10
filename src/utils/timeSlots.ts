import { format, addMinutes, parse } from 'date-fns';
import { toIST } from './dateTime';
import { DAYS_MAP, DEFAULT_WEEKLY_AVAILABILITY } from './constants';

// Cache for generated time slots
const timeSlotCache = new Map<string, TimeOption[]>();

const DEBUG = import.meta.env.VITE_DEV_MODE === 'true';

export const TIME_SLOTS = {
  INTERVAL: 5,      // 5-minute intervals
  BUFFER: 30,       // 30-minute buffer for same-day appointments
  CACHE_TTL: 60000  // Cache time slots for 1 minute
};

export interface TimeOption {
  value: string;
  label: string;
}

const getCacheKey = (date: Date, interval: number): string => {
  return `${date.toISOString().split('T')[0]}_${interval}`;
};

export const generateTimeSlots = (
  interval: number = TIME_SLOTS.INTERVAL,
  date: Date,
  schedule: { slots: { startTime: string; endTime: string }[] }
): TimeOption[] => {
  const cacheKey = getCacheKey(date, interval);
  const currentTime = Date.now();

  // Check cache first
  const cached = timeSlotCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const slots: TimeOption[] = [];
  const istDate = toIST(date);
  
  try {
    if (DEBUG) console.log('Generating slots for date:', istDate);

    if (!schedule?.slots?.length) {
      if (DEBUG) console.log('No slots defined in schedule');
      return slots;
    }

    // Check if it's today
    const now = toIST(new Date());
    const isToday = istDate.toDateString() === now.toDateString();
    const currentMinutes = isToday ? now.getHours() * 60 + now.getMinutes() : 0;

    // Generate slots for each time range
    schedule.slots.forEach(slot => {
      if (!slot.startTime || !slot.endTime) {
        console.warn('Invalid slot format:', slot);
        return;
      }

      const [startHour, startMin] = slot.startTime.split(':').map(Number);
      const [endHour, endMin] = slot.endTime.split(':').map(Number);
      
      if (isNaN(startHour) || isNaN(startMin) || isNaN(endHour) || isNaN(endMin)) {
        console.warn('Invalid time format:', { startTime: slot.startTime, endTime: slot.endTime });
        return;
      }

      let currentTime = new Date(istDate);
      currentTime.setHours(startHour, startMin, 0, 0);
      
      const endTime = new Date(istDate);
      endTime.setHours(endHour, endMin, 0, 0);

      // Validate time range
      if (endTime <= currentTime) {
        console.warn('Invalid time range:', { start: slot.startTime, end: slot.endTime });
        return;
      }

      while (currentTime <= endTime) {
        const slotMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        
        // Skip past times for today
        if (!isToday || (slotMinutes > currentMinutes + TIME_SLOTS.BUFFER)) {
          slots.push({
            value: format(currentTime, 'HH:mm'),
            label: format(currentTime, 'hh:mm a')
          });
        }

        currentTime = addMinutes(currentTime, interval);
      }
    });

    if (DEBUG) console.log(`Generated ${slots.length} slots`);

    // Only cache if slots were generated
    if (slots.length > 0) {
      timeSlotCache.set(cacheKey, slots);
      setTimeout(() => timeSlotCache.delete(cacheKey), TIME_SLOTS.CACHE_TTL);
    }

    return slots;
  } catch (error) {
    console.error('Error generating time slots:', error);
    return [];
  }
};