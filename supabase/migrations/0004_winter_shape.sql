/*
  # Initial Database Schema Setup

  1. Tables
    - doctors: Store doctor information
    - appointments: Manage patient appointments
    - schema_versions: Track database migrations

  2. Security
    - RLS enabled on all tables
    - Public read access to doctors
    - Controlled access to appointments
*/

-- Create schema version tracking
CREATE TABLE IF NOT EXISTS schema_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version text NOT NULL,
  applied_at timestamptz NOT NULL DEFAULT now()
);

-- Create doctors table
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

-- Create appointments table
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

-- Enable Row Level Security
ALTER TABLE schema_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create security policies
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

-- Record schema version
INSERT INTO schema_versions (version) VALUES ('1.0.0');