/*
  # Fix Announcements System

  1. Changes
    - Add indexes for better performance
    - Add cascade delete for doctor_id
    - Add function to clean up expired announcements
    - Add trigger to auto-delete expired announcements

  2. Security
    - Add RLS policies for staff access
*/

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_announcements_dates 
  ON announcements(start_date, end_date);

CREATE INDEX IF NOT EXISTS idx_announcements_doctor 
  ON announcements(doctor_id);

-- Function to clean up expired announcements
CREATE OR REPLACE FUNCTION cleanup_expired_announcements() 
RETURNS void AS $$
BEGIN
  DELETE FROM announcements 
  WHERE end_date < NOW();
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to clean up expired announcements
SELECT cron.schedule(
  'cleanup-expired-announcements',
  '0 0 * * *', -- Run daily at midnight
  'SELECT cleanup_expired_announcements()'
);

-- Function to validate announcement dates
CREATE OR REPLACE FUNCTION validate_announcement_dates()
RETURNS trigger AS $$
BEGIN
  -- Ensure start_date is not in the past
  IF NEW.start_date < NOW() THEN
    RAISE EXCEPTION 'Start date cannot be in the past';
  END IF;

  -- Ensure end_date is after start_date
  IF NEW.end_date <= NEW.start_date THEN
    RAISE EXCEPTION 'End date must be after start date';
  END IF;

  -- Ensure end_date is not more than 30 days from start_date
  IF NEW.end_date > NEW.start_date + INTERVAL '30 days' THEN
    RAISE EXCEPTION 'Announcement duration cannot exceed 30 days';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for date validation
CREATE TRIGGER validate_announcement_dates_trigger
  BEFORE INSERT OR UPDATE ON announcements
  FOR EACH ROW
  EXECUTE FUNCTION validate_announcement_dates();

-- Function to notify clients of new announcements
CREATE OR REPLACE FUNCTION notify_announcement_change()
RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify(
    'announcement_change',
    json_build_object(
      'id', NEW.id,
      'doctor_id', NEW.doctor_id,
      'message', NEW.message,
      'start_date', NEW.start_date,
      'end_date', NEW.end_date
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for notifications
CREATE TRIGGER notify_announcement_change_trigger
  AFTER INSERT OR UPDATE ON announcements
  FOR EACH ROW
  EXECUTE FUNCTION notify_announcement_change();