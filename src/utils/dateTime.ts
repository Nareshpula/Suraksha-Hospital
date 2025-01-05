import { format, parse, addMinutes, subMinutes, startOfDay } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime, formatInTimeZone } from 'date-fns-tz';

export const IST_TIMEZONE = 'Asia/Kolkata';

export const toIST = (date: Date): Date => {
  return utcToZonedTime(date, IST_TIMEZONE);
};

export const fromIST = (date: Date): Date => {
  return zonedTimeToUtc(date, IST_TIMEZONE);
};

export const formatISTDate = (date: Date): string => {
  return formatInTimeZone(date, IST_TIMEZONE, 'yyyy-MM-dd');
};

export const formatISTTime = (date: Date): string => {
  return formatInTimeZone(date, IST_TIMEZONE, 'HH:mm');
};

export const parseISTDateTime = (date: string, time: string): Date => {
  const dateTimeStr = `${date} ${time}`;
  const parsedDate = parse(dateTimeStr, 'yyyy-MM-dd HH:mm', new Date());
  return fromIST(parsedDate);
};

export const getCurrentISTDate = (): Date => {
  return toIST(new Date());
};

export const formatDisplayDate = (date: string): string => {
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
  return format(parsedDate, 'MMMM d, yyyy');
};