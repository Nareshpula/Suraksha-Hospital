/*
  # Create appointment and OTP verification schema

  1. Tables
    - `doctors` with fixed UUIDs
    - `appointments` with proper constraints
    - `otp_verifications` for phone verification

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies
*/

-- Drop existing tables
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS otp_verifications;
DROP TABLE IF EXISTS doctors;

-- Create doctors table
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

-- Create appointments table
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

-- Create OTP verifications table
CREATE TABLE otp_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL,
  otp_code text NOT NULL,
  expires_at timestamptz NOT NULL,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_phone CHECK (phone_number ~ '^[6-9]\d{9}$')
);

-- Create indexes
CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX idx_appointments_phone_number ON appointments(phone_number);
CREATE INDEX idx_otp_phone_number ON otp_verifications(phone_number);
CREATE INDEX idx_otp_expires_at ON otp_verifications(expires_at);

-- Enable RLS
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

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

CREATE POLICY "Allow public to create OTP verifications"
  ON otp_verifications FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public to verify OTP"
  ON otp_verifications FOR SELECT
  TO public
  USING (
    phone_number = current_user AND
    verified = false AND
    expires_at > now()
  );

CREATE POLICY "Allow public to mark OTP as verified"
  ON otp_verifications FOR UPDATE
  TO public
  USING (
    phone_number = current_user AND
    verified = false AND
    expires_at > now()
  )
  WITH CHECK (verified = true);

-- Insert initial doctors
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