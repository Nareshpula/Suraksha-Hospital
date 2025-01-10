/*
  # Fix Appointments Table

  1. Changes
    - Drops and recreates appointments table with proper foreign key constraint
    - Ensures proper data types and constraints
    - Sets up RLS policies
    
  2. Security
    - Maintains existing RLS policies
    - Adds proper constraints for data integrity
*/

-- Drop existing appointments table if it exists
DROP TABLE IF EXISTS appointments;

-- Create appointments table with proper constraints
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid NOT NULL REFERENCES doctors(id),
  patient_name text NOT NULL,
  phone_number text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT valid_phone CHECK (phone_number ~ '^[6-9]\d{9}$'),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  CONSTRAINT future_date CHECK (appointment_date >= CURRENT_DATE)
);

-- Create index for faster lookups
CREATE INDEX appointments_doctor_id_idx ON appointments(doctor_id);
CREATE INDEX appointments_phone_number_idx ON appointments(phone_number);
CREATE INDEX appointments_status_idx ON appointments(status);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow public to create appointments"
  ON appointments FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow users to view own appointments"
  ON appointments FOR SELECT
  TO public
  USING (phone_number = current_user);

-- Add comment for documentation
COMMENT ON TABLE appointments IS 'Stores patient appointments with doctors';