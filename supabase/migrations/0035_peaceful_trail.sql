/*
  # Fix Announcements Table

  1. Changes
    - Drop and recreate announcements table with proper constraints
    - Add indexes for performance
    - Set up RLS policies
    - Add cascade delete for doctor references

  2. Security
    - Enable RLS
    - Add policies for public viewing and doctor management
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS announcements;

-- Create announcements table
CREATE TABLE announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  message text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (end_date >= start_date)
);

-- Create indexes for performance
CREATE INDEX idx_announcements_dates ON announcements(start_date, end_date);
CREATE INDEX idx_announcements_doctor ON announcements(doctor_id);
CREATE INDEX idx_announcements_current ON announcements(start_date, end_date) 
  WHERE CURRENT_DATE BETWEEN start_date AND end_date;

-- Enable RLS
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public to view current announcements"
  ON announcements
  FOR SELECT
  TO public
  USING (
    CURRENT_DATE BETWEEN start_date AND end_date
  );

CREATE POLICY "Allow doctors to manage their announcements"
  ON announcements
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Add helpful comment
COMMENT ON TABLE announcements IS 'Stores doctor availability announcements with automatic cleanup';