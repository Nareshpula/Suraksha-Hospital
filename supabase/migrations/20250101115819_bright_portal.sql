/*
  # Create appointments table and related functions

  1. New Tables
    - `appointments`
      - `id` (uuid, primary key)
      - `doctor_id` (uuid, foreign key)
      - `patient_name` (text)
      - `phone_number` (text)
      - `appointment_date` (date)
      - `appointment_time` (time)
      - `notes` (text, nullable)
      - `status` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for public access
    - Add validation triggers
*/

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE,
  patient_name text NOT NULL,
  phone_number text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_phone_number CHECK (phone_number ~ '^[6-9]\d{9}$'),
  CONSTRAINT future_appointment CHECK (
    (appointment_date > CURRENT_DATE) OR 
    (appointment_date = CURRENT_DATE AND appointment_time > CURRENT_TIME)
  )
);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public insert access for appointments"
  ON appointments
  FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

CREATE POLICY "Users can view own appointments"
  ON appointments
  FOR SELECT
  TO PUBLIC
  USING (phone_number = current_setting('request.jwt.claims')::json->>'phone_number');

-- Create indexes
CREATE INDEX idx_appointments_doctor_date 
  ON appointments(doctor_id, appointment_date, appointment_time);
CREATE INDEX idx_appointments_phone 
  ON appointments(phone_number);

-- Function to check appointment availability
CREATE OR REPLACE FUNCTION check_appointment_availability(
  p_doctor_id uuid,
  p_date date,
  p_time time
) RETURNS boolean AS $$
DECLARE
  v_existing_count int;
BEGIN
  -- Check for existing appointments in the same 30-minute slot
  SELECT COUNT(*)
  INTO v_existing_count
  FROM appointments
  WHERE doctor_id = p_doctor_id
    AND appointment_date = p_date
    AND appointment_time BETWEEN 
      p_time - interval '15 minutes' 
      AND p_time + interval '15 minutes'
    AND status != 'cancelled';

  RETURN v_existing_count = 0;
END;
$$ LANGUAGE plpgsql;

-- Trigger to validate appointment slots
CREATE OR REPLACE FUNCTION validate_appointment_slot()
RETURNS trigger AS $$
BEGIN
  IF NOT check_appointment_availability(NEW.doctor_id, NEW.appointment_date, NEW.appointment_time) THEN
    RAISE EXCEPTION 'This appointment slot is not available';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_appointment_slot_trigger
  BEFORE INSERT ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION validate_appointment_slot();