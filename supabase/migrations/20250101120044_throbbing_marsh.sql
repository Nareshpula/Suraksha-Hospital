/*
  # Fix appointments and OTP verification

  1. Create appointments table with proper constraints
  2. Add RLS policies
  3. Add validation triggers
  4. Add timezone handling
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
    (appointment_date = CURRENT_DATE AND appointment_time > CURRENT_TIME AT TIME ZONE 'Asia/Kolkata')
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
  v_ist_time time;
BEGIN
  -- Convert time to IST
  v_ist_time := p_time AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata';
  
  -- Check for existing appointments in the same 30-minute slot
  SELECT COUNT(*)
  INTO v_existing_count
  FROM appointments
  WHERE doctor_id = p_doctor_id
    AND appointment_date = p_date
    AND appointment_time BETWEEN 
      v_ist_time - interval '15 minutes' 
      AND v_ist_time + interval '15 minutes'
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

-- Function to handle appointment notifications
CREATE OR REPLACE FUNCTION notify_appointment_change()
RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify(
    'appointment_change',
    json_build_object(
      'id', NEW.id,
      'doctor_id', NEW.doctor_id,
      'patient_name', NEW.patient_name,
      'appointment_date', NEW.appointment_date,
      'appointment_time', NEW.appointment_time,
      'status', NEW.status
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_appointment_change_trigger
  AFTER INSERT OR UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION notify_appointment_change();