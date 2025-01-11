import { format, addMinutes, parse } from 'date-fns';
import { toIST, getCurrentISTDate } from './dateTime';
import { DAYS_MAP, DEFAULT_WEEKLY_AVAILABILITY } from './constants';

// Cache for generated time slots
const timeSlotCache = new Map<string, TimeOption[]>();
const DEBUG = import.meta.env.VITE_DEV_MODE === 'true';

// Cache for daily schedules
const scheduleCache = new Map<string, { slots: TimeOption[]; expiry: number }>();
const SCHEDULE_CACHE_TTL = 300000; // 5 minutes

export const TIME_SLOTS = {
  INTERVAL: 5,      // 5-minute intervals
  CACHE_TTL: 60000  // Cache time slots for 1 minute
};

// Pre-generate common time slots
const commonTimeSlots = (() => {
  const slots: TimeOption[] = [];
  let currentTime = new Date();
  currentTime.setHours(10, 0, 0, 0);
  
  const endTime = new Date();
  endTime.setHours(20, 0, 0, 0);

  while (currentTime <= endTime) {
    slots.push({
      value: format(currentTime, 'HH:mm'),
      label: format(currentTime, 'hh:mm a')
    });
    currentTime = addMinutes(currentTime, TIME_SLOTS.INTERVAL);
  }
  return slots;
})();

export interface TimeOption {
  value: string;
  label: string;
}

const getCacheKey = (date: Date, interval: number): string => {
  // For today's date, don't cache at all
  const now = toIST(new Date());
  const isToday = date.toDateString() === now.toDateString(); 
  if (isToday) {
    return `${date.toISOString()}_${now.getTime()}`; // Unique key each time
  }
  return `${date.toISOString().split('T')[0]}_${interval}`;
};

const filterSlotsBySchedule = (slots: TimeOption[], schedule: { slots: { startTime: string; endTime: string }[] }): TimeOption[] => {
  if (!schedule?.slots?.length) return [];

  return slots.filter(slot => {
    const slotTime = parse(slot.value, 'HH:mm', new Date());
    
    return schedule.slots.some(scheduleSlot => {
      const startTime = parse(scheduleSlot.startTime, 'HH:mm', new Date());
      const endTime = parse(scheduleSlot.endTime, 'HH:mm', new Date());
      return slotTime >= startTime && slotTime <= endTime;
    });
  });
};

export const generateTimeSlots = (
  interval: number = TIME_SLOTS.INTERVAL,
  date: Date,
  schedule: { slots: { startTime: string; endTime: string }[] }
): TimeOption[] => {
  const slots: TimeOption[] = [];
  const istDate = toIST(date);

  const cacheKey = getCacheKey(date, interval);
  const currentTime = Date.now();
  const now = toIST(new Date());
  const isToday = date.toDateString() === now.toDateString();

  if (DEBUG) {
    console.log('Generating slots for:', {
      date: format(istDate, 'yyyy-MM-dd'),
      schedule
    });
  }
  
  if (DEBUG) {
    console.log('Time calculations:', {
      date: format(istDate, 'yyyy-MM-dd'),
      isToday,
      currentTime: format(now, 'HH:mm')
    });
  }

  // For today, don't use cache to ensure fresh slots
  if (isToday) {
    timeSlotCache.delete(cacheKey);
    if (DEBUG) console.log('Cleared cache for today');
  }

  // Check cache first
  const cached = timeSlotCache.get(cacheKey);
  if (cached) {
    if (DEBUG) console.log('Returning cached slots:', cached);
    return cached;
  }

  try {
    if (!schedule?.slots?.length) {
      if (DEBUG) console.log('No slots defined in schedule');
      return slots;
    }

    const currentIST = toIST(new Date());
    const isToday = istDate.toDateString() === currentIST.toDateString();

    // Use pre-generated slots and filter by schedule
    const filteredSlots = filterSlotsBySchedule(commonTimeSlots, schedule);
    
    if (!isToday) {
      return filteredSlots;
    }

    // For today, filter out past slots
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTotalMinutes = currentHour * 60 + currentMinute;

    return filteredSlots.filter(slot => {
      const [slotHour, slotMinute] = slot.value.split(':').map(Number);
      const slotTotalMinutes = slotHour * 60 + slotMinute;
      return slotTotalMinutes > currentTotalMinutes;
    });

  } catch (error) {
    console.error('Error generating time slots:', error);
    return [];
  }
};