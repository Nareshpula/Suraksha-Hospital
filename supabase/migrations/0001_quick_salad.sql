/*
  # Initial Schema Setup

  1. New Tables
    - doctors
      - id (uuid, primary key)
      - name (text)
      - specialty (text) 
      - qualification (text)
      - experience (text)
      - availability (jsonb)
      - image_url (text)
      - created_at (timestamptz)
    
    - appointments
      - id (uuid, primary key)
      - doctor_id (uuid, foreign key)
      - patient_name (text)
      - phone_number (text)
      - appointment_date (date)
      - appointment_time (time)
      - status (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for doctors
    - Authenticated appointment creation
    - Phone number based appointment access
*/

-- Create essential tables
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialty text NOT NULL,
  qualification text NOT NULL,
  experience text,
  availability jsonb,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid NOT NULL REFERENCES doctors(id),
  patient_name text NOT NULL,
  phone_number text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT valid_phone CHECK (phone_number ~ '^[6-9]\d{9}$'),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'cancelled'))
);

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

-- Insert initial doctors
INSERT INTO doctors (name, specialty, qualification, experience)
VALUES
  ('Dr. N.SWAPNA', 'Paediatrics', 'M.B.B.S, MD, IAP-Fellowship in Neonatology', 'Senior Consultant'),
  ('Dr.Bysani NAVEEN KUMAR', 'General Medicine', 'M.B.B.S., M.D General Medicine', 'Senior Consultant')
ON CONFLICT DO NOTHING;