/*
  # Fix Doctor IDs and Appointments Schema

  1. Changes
    - Drop and recreate tables with proper constraints
    - Insert doctors with correct UUIDs
    - Add proper indexes and RLS policies
    
  2. Security
    - Enable RLS on all tables
    - Add proper access policies
*/

-- Drop existing tables to ensure clean slate
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS doctors;

-- Create doctors table with proper schema
CREATE TABLE doctors (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  specialty text NOT NULL,
  qualification text NOT NULL,
  experience text,
  availability jsonb,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

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

-- Create indexes for better performance
CREATE INDEX appointments_doctor_id_idx ON appointments(doctor_id);
CREATE INDEX appointments_phone_number_idx ON appointments(phone_number);
CREATE INDEX appointments_status_idx ON appointments(status);
CREATE INDEX doctors_name_idx ON doctors(name);

-- Enable RLS
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
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

-- Insert doctors with correct UUIDs
INSERT INTO doctors (id, name, specialty, qualification, experience, image_url)
VALUES 
  (
    '123e4567-e89b-12d3-a456-426614174000'::uuid,
    'Dr. N.SWAPNA',
    'Paediatrics Specialist',
    'M.B.B.S, MD, IAP-Fellowship in Neonatology (Fernandez Hospital, Hyderabad)',
    'Senior Consultant',
    'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg'
  ),
  (
    '123e4567-e89b-12d3-a456-426614174001'::uuid,
    'Dr.Bysani NAVEEN KUMAR',
    'General Medicine, Physician & Diabetologist',
    'M.B.B.S., M.D General Medicine',
    'Senior Consultant',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d'
  );