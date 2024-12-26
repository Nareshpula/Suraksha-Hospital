/*
  # Add Announcements Table
  
  1. New Tables
    - `announcements`
      - `id` (uuid, primary key)
      - `doctor_id` (uuid, references doctors)
      - `message` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS
    - Add policies for public read access
*/

-- Create announcements table
CREATE TABLE announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES doctors(id),
  message text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (end_date >= start_date)
);

-- Create indexes
CREATE INDEX idx_announcements_dates ON announcements(start_date, end_date);
CREATE INDEX idx_announcements_doctor ON announcements(doctor_id);

-- Enable RLS
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public to view announcements"
  ON announcements
  FOR SELECT
  TO public
  USING (
    CURRENT_DATE BETWEEN start_date AND end_date
  );