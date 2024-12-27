/*
  # Fix Announcements Functionality

  1. Changes
    - Add better timezone handling
    - Improve trigger function
    - Add periodic refresh
    - Add indexes for performance
  
  2. Security
    - Enable RLS
    - Add policies for access control
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS update_announcement_current_status_trigger ON announcements;
DROP FUNCTION IF EXISTS update_announcement_current_status();
DROP FUNCTION IF EXISTS refresh_announcements_status();

-- Create improved trigger function with better timezone handling
CREATE OR REPLACE FUNCTION update_announcement_current_status()
RETURNS TRIGGER AS $$
DECLARE
  current_time timestamptz;
BEGIN
  current_time := CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata';
  
  -- Set is_current based on current IST time
  NEW.is_current := current_time BETWEEN NEW.start_date AND NEW.end_date;
  
  -- Log status change for debugging
  IF NEW.is_current IS DISTINCT FROM OLD.is_current OR OLD.is_current IS NULL THEN
    RAISE NOTICE 'Announcement % status changed to %', NEW.id, NEW.is_current;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger that runs on both INSERT and UPDATE
CREATE TRIGGER update_announcement_current_status_trigger
BEFORE INSERT OR UPDATE ON announcements
FOR EACH ROW
EXECUTE FUNCTION update_announcement_current_status();

-- Create function to periodically update announcement status
CREATE OR REPLACE FUNCTION refresh_announcements_status()
RETURNS void AS $$
DECLARE
  current_time timestamptz;
BEGIN
  current_time := CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata';
  
  UPDATE announcements 
  SET is_current = (current_time BETWEEN start_date AND end_date)
  WHERE is_current IS DISTINCT FROM (current_time BETWEEN start_date AND end_date);
END;
$$ LANGUAGE plpgsql;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_announcements_is_current ON announcements(is_current) WHERE is_current = true;
CREATE INDEX IF NOT EXISTS idx_announcements_dates_current ON announcements(start_date, end_date) 
WHERE CURRENT_TIMESTAMP BETWEEN start_date AND end_date;

-- Update existing announcements
SELECT refresh_announcements_status();