-- Drop existing trigger and function
DROP TRIGGER IF EXISTS update_announcement_current_status_trigger ON announcements;
DROP FUNCTION IF EXISTS update_announcement_current_status();
DROP FUNCTION IF EXISTS refresh_announcements_status();

-- Create improved trigger function with proper IST timezone handling
CREATE OR REPLACE FUNCTION update_announcement_current_status()
RETURNS TRIGGER AS $$
DECLARE
  ist_now timestamptz;
BEGIN
  -- Get current time in IST
  ist_now := (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::timestamptz;
  
  -- Set is_current based on IST time
  NEW.is_current := ist_now BETWEEN 
    (NEW.start_date AT TIME ZONE 'Asia/Kolkata')::timestamptz AND 
    (NEW.end_date AT TIME ZONE 'Asia/Kolkata')::timestamptz;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_announcement_current_status_trigger
BEFORE INSERT OR UPDATE ON announcements
FOR EACH ROW
EXECUTE FUNCTION update_announcement_current_status();

-- Create function to refresh announcement status
CREATE OR REPLACE FUNCTION refresh_announcements_status()
RETURNS void AS $$
DECLARE
  ist_now timestamptz;
BEGIN
  ist_now := (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::timestamptz;
  
  UPDATE announcements 
  SET is_current = (
    ist_now BETWEEN 
    (start_date AT TIME ZONE 'Asia/Kolkata')::timestamptz AND 
    (end_date AT TIME ZONE 'Asia/Kolkata')::timestamptz
  );
END;
$$ LANGUAGE plpgsql;

-- Update existing announcements
SELECT refresh_announcements_status();