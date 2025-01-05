import { format, addMinutes, parse } from 'date-fns';
import { toIST } from './dateTime';
import { DAYS_MAP, DEFAULT_WEEKLY_AVAILABILITY } from './constants';

const DEBUG = import.meta.env.VITE_DEV_MODE === 'true';

export const TIME_SLOTS = {
  INTERVAL: 5,      // 5-minute intervals
  BUFFER: 30        // 30-minute buffer for same-day appointments
};

export interface TimeOption {
  value: string;
  label: string;
}

export const generateTimeSlots = (
  interval: number = TIME_SLOTS.INTERVAL,
  date: Date
): TimeOption[] => {
  const slots: TimeOption[] = [];
  const istDate = toIST(date);
  
  if (DEBUG) console.log('Generating slots for date:', istDate);

  // Get day schedule
  const dayName = DAYS_MAP[istDate.getDay() as keyof typeof DAYS_MAP];
  const schedule = DEFAULT_WEEKLY_AVAILABILITY[dayName];

  if (!schedule?.isAvailable || !schedule.slots?.length) {
    if (DEBUG) console.log('Day not available or no slots');
    return slots;
  }

  // Check if it's today
  const now = toIST(new Date());
  const isToday = istDate.toDateString() === now.toDateString();
  const currentMinutes = isToday ? now.getHours() * 60 + now.getMinutes() : 0;

  // Generate slots for each time range
  schedule.slots.forEach(slot => {
    const [startHour, startMin] = slot.startTime.split(':').map(Number);
    const [endHour, endMin] = slot.endTime.split(':').map(Number);
    
    let currentTime = new Date(istDate);
    currentTime.setHours(startHour, startMin, 0, 0);
    
    const endTime = new Date(istDate);
    endTime.setHours(endHour, endMin, 0, 0);

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

  if (DEBUG) console.log(`Generated ${slots.length} slots for ${dayName}`);
  return slots;
}