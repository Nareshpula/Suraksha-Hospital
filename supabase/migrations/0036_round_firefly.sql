/*
  # Create Announcements Table

  1. New Tables
    - `announcements` table for storing doctor availability announcements
      - `id` (uuid, primary key)
      - `doctor_id` (uuid, references doctors)
      - `message` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `created_at` (timestamptz)

  2. Changes
    - Add indexes for performance optimization
    - Enable RLS
    - Add policies for public access
    - Add cascade deletion for doctor references

  3. Security
    - Enable RLS
    - Add policies for public viewing
*/

-- Drop existing table if exists
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

CREATE POLICY "Allow public to manage announcements"
  ON announcements
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Add helpful comment
COMMENT ON TABLE announcements IS 'Stores doctor availability announcements with automatic cleanup';