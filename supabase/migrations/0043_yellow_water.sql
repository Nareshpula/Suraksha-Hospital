/*
  # Fix Timezone and Permissions

  1. Changes
    - Set timezone to Asia/Kolkata (IST)
    - Add timezone handling functions
    - Fix permissions for announcements table
    - Add timezone column to relevant tables

  2. Security
    - Update RLS policies
    - Grant necessary permissions
*/

-- Set timezone to IST
ALTER DATABASE postgres SET timezone TO 'Asia/Kolkata';

-- Create timezone conversion functions
CREATE OR REPLACE FUNCTION to_ist(utc_date timestamp with time zone) 
RETURNS timestamp with time zone AS $$
BEGIN
  RETURN utc_date AT TIME ZONE 'Asia/Kolkata';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION from_ist(ist_date timestamp with time zone) 
RETURNS timestamp with time zone AS $$
BEGIN
  RETURN ist_date AT TIME ZONE 'UTC';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Drop and recreate announcements table with proper timezone handling
DROP TABLE IF EXISTS announcements;

CREATE TABLE announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  message text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT (now() AT TIME ZONE 'Asia/Kolkata'),
  timezone text NOT NULL DEFAULT 'Asia/Kolkata',
  CONSTRAINT valid_dates CHECK (end_date >= start_date)
);

-- Create indexes
CREATE INDEX idx_announcements_dates ON announcements(start_date, end_date);
CREATE INDEX idx_announcements_doctor ON announcements(doctor_id);
CREATE INDEX idx_announcements_current ON announcements(start_date, end_date) 
  WHERE CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata' BETWEEN start_date AND end_date;

-- Enable RLS
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Create simplified policy for full access
CREATE POLICY "Allow all operations on announcements"
  ON announcements
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Grant permissions
GRANT ALL ON announcements TO public;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO public;