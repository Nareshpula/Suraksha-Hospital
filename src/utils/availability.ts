import { DAYS_MAP } from './constants';
import { WeeklyAvailability, AvailabilityException, TimeSlot } from '../types/availability';
import { parse, isAfter, isBefore, addMinutes } from 'date-fns';

export const isTimeSlotAvailable = (
  date: Date,
  time: string,
  weeklySchedule: WeeklyAvailability,
  exceptions: AvailabilityException[]
): boolean => {
  // Reset hours/minutes for date comparison
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);

  // First check if date is today and time is in the past
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  if (compareDate.getTime() === today.getTime()) {
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [hours, minutes] = time.split(':').map(Number);
    const slotTime = hours * 60 + minutes;
    
    // Add 30 min buffer for same-day appointments
    if (slotTime <= currentTime + 30) {
      return false;
    }
  }

  // Don't allow bookings more than 30 days in advance
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  maxDate.setHours(0, 0, 0, 0);

  if (compareDate > maxDate || compareDate < today) {
    return false;
  }

  // Check if there's an exception for this date
  const dateStr = compareDate.toISOString().split('T')[0];
  const exception = exceptions.find(e => e.date === dateStr);
  
  // If there's an exception for this date
  if (exception) {
    // If marked as unavailable, no slots are available
    if (exception.type === 'unavailable') {
      return false;
    }
    // If custom hours are set, check if time is within custom slots
    if (exception.type === 'custom' && exception.slots) {
      return isTimeInSlots(time, exception.slots);
    }
  }

  // Check weekly schedule
  const dayOfWeek = DAYS_MAP[compareDate.getDay() as keyof typeof DAYS_MAP] as keyof WeeklyAvailability;
  const daySchedule = weeklySchedule[dayOfWeek];

  if (!daySchedule || !daySchedule.isAvailable || !daySchedule.slots?.length) {
    return false;
  }

  return isTimeInSlots(time, daySchedule.slots);
};

const isTimeInSlots = (time: string, slots: TimeSlot[]): boolean => {
  const timeDate = parse(time, 'HH:mm', new Date());
  
  return slots.some(slot => {
    const startTime = parse(slot.startTime, 'HH:mm', new Date());
    const endTime = parse(slot.endTime, 'HH:mm', new Date());
    
    // Add 1 minute buffer to end time to include the exact end time
    const endTimeWithBuffer = addMinutes(endTime, 1);
    
    return (
      (isAfter(timeDate, startTime) || timeDate.getTime() === startTime.getTime()) &&
      isBefore(timeDate, endTimeWithBuffer)
    );
  });
};