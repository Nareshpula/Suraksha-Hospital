/*
  # Create Appointments Table

  1. New Tables
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
    - Enable RLS
    - Add policies for appointment management
*/

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

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public to create appointments"
  ON appointments FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow users to view own appointments"
  ON appointments FOR SELECT
  TO public
  USING (phone_number = current_user);