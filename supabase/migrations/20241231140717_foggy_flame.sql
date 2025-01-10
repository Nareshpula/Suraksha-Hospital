/*
  # Add Availability Management Tables

  1. New Tables
    - `doctors`
      - `id` (uuid, primary key)
      - `name` (text)
      - `specialty` (text)
      - `qualification` (text)
      - `experience` (text)
      - `availability` (jsonb)
      - `image_url` (text)
      - `created_at` (timestamptz)
    
    - `announcements`
      - `id` (uuid, primary key)
      - `doctor_id` (uuid, foreign key)
      - `message` (text)
      - `start_date` (timestamptz)
      - `end_date` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialty text NOT NULL,
  qualification text NOT NULL,
  experience text,
  availability jsonb DEFAULT jsonb_build_object(
    'weekly', jsonb_build_object(
      'monday', jsonb_build_object('isAvailable', true, 'slots', ARRAY[jsonb_build_object('startTime', '10:00', 'endTime', '15:30')]),
      'tuesday', jsonb_build_object('isAvailable', true, 'slots', ARRAY[jsonb_build_object('startTime', '10:00', 'endTime', '15:30')]),
      'wednesday', jsonb_build_object('isAvailable', true, 'slots', ARRAY[jsonb_build_object('startTime', '10:00', 'endTime', '15:30')]),
      'thursday', jsonb_build_object('isAvailable', true, 'slots', ARRAY[jsonb_build_object('startTime', '10:00', 'endTime', '15:30')]),
      'friday', jsonb_build_object('isAvailable', true, 'slots', ARRAY[jsonb_build_object('startTime', '10:00', 'endTime', '15:30')]),
      'saturday', jsonb_build_object('isAvailable', true, 'slots', ARRAY[jsonb_build_object('startTime', '10:00', 'endTime', '13:00')]),
      'sunday', jsonb_build_object('isAvailable', false, 'slots', '[]'::jsonb)
    ),
    'exceptions', '[]'::jsonb
  ),
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE,
  message text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_date_range CHECK (end_date > start_date)
);

-- Enable RLS
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Policies for doctors table
CREATE POLICY "Public read access for doctors"
  ON doctors
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Staff can modify doctors"
  ON doctors
  USING (
    auth.role() IN ('admin', 'doctor', 'receptionist')
  );

-- Policies for announcements table
CREATE POLICY "Public read access for announcements"
  ON announcements
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Staff can modify announcements"
  ON announcements
  USING (
    auth.role() IN ('admin', 'doctor', 'receptionist')
  );

-- Insert initial doctors
INSERT INTO doctors (id, name, specialty, qualification, experience, image_url)
VALUES 
  (
    '123e4567-e89b-12d3-a456-426614174000',
    'Dr. N.SWAPNA',
    'Paediatrics Specialist',
    'M.B.B.S, MD, IAP-Fellowship in Neonatology (Fernandez Hospital, Hyderabad)',
    'Senior Consultant',
    'https://lqfwqgmcceameepaaces.supabase.co/storage/v1/object/public/suraksha-hospital-images/Dr.N.SWAPNA.jpg?t=2024-03-20T10:00:00.000Z'
  ),
  (
    '123e4567-e89b-12d3-a456-426614174001',
    'Dr.Bysani NAVEEN KUMAR',
    'General Medicine, Physician & Diabetologist',
    'M.B.B.S., M.D General Medicine',
    'Senior Consultant',
    'https://lqfwqgmcceameepaaces.supabase.co/storage/v1/object/public/suraksha-hospital-images/Dr.BysaniNAVEENKUMAR.jpg?t=2024-03-20T10:00:00.000Z'
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  specialty = EXCLUDED.specialty,
  qualification = EXCLUDED.qualification,
  experience = EXCLUDED.experience,
  image_url = EXCLUDED.image_url;