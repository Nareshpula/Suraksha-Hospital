-- Drop existing trigger and function
DROP TRIGGER IF EXISTS update_announcement_current_status_trigger ON announcements;
DROP FUNCTION IF EXISTS update_announcement_current_status();

-- Create improved trigger function
CREATE OR REPLACE FUNCTION update_announcement_current_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Set is_current based on current timestamp
  NEW.is_current := CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata' BETWEEN 
    NEW.start_date AND NEW.end_date;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_announcement_current_status_trigger
BEFORE INSERT OR UPDATE ON announcements
FOR EACH ROW
EXECUTE FUNCTION update_announcement_current_status();

-- Update existing announcements with IST timezone
UPDATE announcements 
SET is_current = (
  CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata' BETWEEN start_date AND end_date
);

-- Create function to periodically update is_current status
CREATE OR REPLACE FUNCTION refresh_announcements_status()
RETURNS void AS $$
BEGIN
  UPDATE announcements 
  SET is_current = (
    CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata' BETWEEN start_date AND end_date
  );
END;
$$ LANGUAGE plpgsql;