-- Add is_current column and trigger to announcements table
ALTER TABLE announcements 
ADD COLUMN IF NOT EXISTS is_current boolean DEFAULT false;

-- Create or replace the trigger function
CREATE OR REPLACE FUNCTION update_announcement_current_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Set is_current based on current timestamp
  NEW.is_current := CURRENT_TIMESTAMP >= NEW.start_date AND CURRENT_TIMESTAMP <= NEW.end_date;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_announcement_current_status_trigger'
  ) THEN
    CREATE TRIGGER update_announcement_current_status_trigger
    BEFORE INSERT OR UPDATE ON announcements
    FOR EACH ROW
    EXECUTE FUNCTION update_announcement_current_status();
  END IF;
END
$$;

-- Update existing announcements
UPDATE announcements 
SET is_current = (CURRENT_TIMESTAMP >= start_date AND CURRENT_TIMESTAMP <= end_date);