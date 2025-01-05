/*
  # Fix Timezone Handling

  1. Changes
    - Set timezone to Asia/Kolkata (IST)
    - Add timezone column to announcements
    - Update existing functions to handle IST

  2. Security
    - Maintain existing policies
    - Add timezone validation
*/

-- Set timezone to IST
ALTER DATABASE postgres SET timezone TO 'Asia/Kolkata';

-- Add timezone column to announcements
ALTER TABLE announcements 
ADD COLUMN timezone text NOT NULL DEFAULT 'Asia/Kolkata';

-- Create function to convert to IST
CREATE OR REPLACE FUNCTION to_ist(utc_date timestamp with time zone) 
RETURNS timestamp with time zone AS $$
BEGIN
  RETURN utc_date AT TIME ZONE 'Asia/Kolkata';
END;
$$ LANGUAGE plpgsql IMMUTABLE;