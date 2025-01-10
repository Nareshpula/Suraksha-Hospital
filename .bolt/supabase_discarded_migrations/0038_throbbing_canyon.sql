/*
  # Fix Announcements Table

  1. Changes
    - Drop and recreate announcements table with proper structure
    - Add correct indexes for performance
    - Enable RLS with proper policies
    - Add cascade deletion for doctor references

  2. Security
    - Enable RLS
    - Add simplified policies for public access
    - Allow full CRUD operations
*/

-- Drop existing table if exists
DROP TABLE IF EXISTS announcements;

-- Create announcements table with proper structure
CREATE TABLE announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  message text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (end_date >= start_date),
  CONSTRAINT valid_doctor FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX idx_announcements_dates ON announcements(start_date, end_date);
CREATE INDEX idx_announcements_doctor ON announcements(doctor_id);
CREATE INDEX idx_announcements_current ON announcements(start_date, end_date) 
  WHERE CURRENT_DATE BETWEEN start_date AND end_date;

-- Enable RLS
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Create simplified policies for full access
CREATE POLICY "Allow all operations on announcements"
  ON announcements
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Add helpful comment
COMMENT ON TABLE announcements IS 'Stores doctor availability announcements and schedule exceptions';

-- Grant necessary permissions
GRANT ALL ON announcements TO public;
GRANT USAGE ON SEQUENCE announcements_id_seq TO public;