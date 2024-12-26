import { format, parse, addMinutes, subMinutes, startOfDay } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime, formatInTimeZone } from 'date-fns-tz';

const IST_TIMEZONE = 'Asia/Kolkata';

export const toIST = (date: Date): Date => {
  return utcToZonedTime(date, IST_TIMEZONE);
};

export const fromIST = (date: Date): Date => {
  return zonedTimeToUtc(date, IST_TIMEZONE);
};

export const formatISTDate = (date: Date): string => {
  const istDate = toIST(date);
  return format(istDate, 'yyyy-MM-dd');
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

export const isBeforeIST = (date1: Date, date2: Date): boolean => {
  const date1IST = toIST(date1);
  const date2IST = toIST(date2);
  return date1IST < date2IST;
};