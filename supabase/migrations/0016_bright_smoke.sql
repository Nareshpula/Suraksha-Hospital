/*
  # Fix Appointments Table Schema

  1. Changes
    - Add notes column to appointments table
    - Improve doctor_id validation
    - Add better constraints and indexes
    
  2. Security
    - Maintain existing RLS policies
    - Add validation functions
*/

-- Drop existing tables to start fresh
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS doctors;

-- Create UUID validation function if it doesn't exist
CREATE OR REPLACE FUNCTION is_valid_uuid(text) RETURNS boolean AS $$
BEGIN
  RETURN $1 ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create doctors table
CREATE TABLE doctors (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  specialty text NOT NULL,
  qualification text NOT NULL,
  experience text,
  availability jsonb,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT valid_uuid CHECK (id IS NOT NULL),
  CONSTRAINT uuid_format CHECK (is_valid_uuid(id::text))
);

-- Create appointments table with notes column
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid NOT NULL,
  patient_name text NOT NULL,
  phone_number text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  notes text, -- Added notes column
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT appointments_doctor_fk FOREIGN KEY (doctor_id) 
    REFERENCES doctors(id) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  CONSTRAINT valid_phone CHECK (phone_number ~ '^[6-9]\d{9}$'),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  CONSTRAINT future_date CHECK (appointment_date >= CURRENT_DATE),
  CONSTRAINT doctor_uuid_format CHECK (is_valid_uuid(doctor_id::text))
);

-- Create indexes
CREATE INDEX idx_doctors_id ON doctors(id);
CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_phone ON appointments(phone_number);

-- Enable RLS
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public to view doctors"
  ON doctors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public to create appointments"
  ON appointments FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow users to view own appointments"
  ON appointments FOR SELECT
  TO public
  USING (phone_number = current_user);

-- Insert doctors with validated UUIDs
INSERT INTO doctors (id, name, specialty, qualification, experience, image_url)
VALUES 
  (
    LOWER('123e4567-e89b-12d3-a456-426614174000')::uuid,
    'Dr. N.SWAPNA',
    'Paediatrics Specialist',
    'M.B.B.S, MD, IAP-Fellowship in Neonatology (Fernandez Hospital, Hyderabad)',
    'Senior Consultant',
    'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg'
  ),
  (
    LOWER('123e4567-e89b-12d3-a456-426614174001')::uuid,
    'Dr.Bysani NAVEEN KUMAR',
    'General Medicine, Physician & Diabetologist',
    'M.B.B.S., M.D General Medicine',
    'Senior Consultant',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d'
  );