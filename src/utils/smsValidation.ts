import { parse } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { IST_TIMEZONE } from './dateTime';

export const isValidPhoneNumber = (phone: string): boolean => {
  return /^[6-9]\d{9}$/.test(phone);
};

export const formatAppointmentDateTime = (date: string, time: string) => {
  if (!date || !time) {
    console.error('Invalid date/time inputs:', { date, time });
    return {
      date: 'Invalid date',
      time: 'Invalid time',
      full: 'Invalid date/time'
    };
  }

  try {
    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error('Invalid date format');
    }

    // Validate time format
    if (!/^\d{2}:\d{2}$/.test(time)) {
      throw new Error('Invalid time format');
    }

    const parsedDateTime = parse(`${date} ${time}`, 'yyyy-MM-dd HH:mm', new Date());
    
    if (isNaN(parsedDateTime.getTime())) {
      throw new Error('Invalid date/time values');
    }

    return {
      date: formatInTimeZone(parsedDateTime, IST_TIMEZONE, 'EEEE, MMMM d, yyyy'),
      time: formatInTimeZone(parsedDateTime, IST_TIMEZONE, 'hh:mm a'),
      full: formatInTimeZone(parsedDateTime, IST_TIMEZONE, 'EEEE, MMMM d, yyyy hh:mm a')
    };
  } catch (error) {
    console.error('Error formatting date/time:', error);
    return {
      date: 'Invalid date',
      time: 'Invalid time', 
      full: 'Invalid date/time'
    };
  }
};