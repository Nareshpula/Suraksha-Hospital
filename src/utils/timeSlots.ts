import { format, addMinutes, parse } from 'date-fns';

const MIN_INTERVAL = 5; // Minimum interval in minutes

export const generateTimeSlots = (
  startTime: string,
  endTime: string,
  interval: number = MIN_INTERVAL,
  date: Date
): string[] => {
  const slots: string[] = [];
  let currentTime = parse(startTime, 'HH:mm', new Date());
  const end = parse(endTime, 'HH:mm', new Date());
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  // Ensure interval is at least MIN_INTERVAL minutes
  const safeInterval = Math.max(interval, MIN_INTERVAL);

  while (currentTime <= end) {
    // Skip past times if date is today
    if (isToday) {
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const slotMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
      
      if (slotMinutes <= currentMinutes + 30) { // Add 30 min buffer
        currentTime = addMinutes(currentTime, safeInterval);
        continue;
      }
    }

    // Format time in 24-hour format for consistency
    const timeSlot = format(currentTime, 'HH:mm');
    slots.push(timeSlot);
    currentTime = addMinutes(currentTime, safeInterval);
  }

  return slots;
};