/*
  # Fix timezone handling and appointment validation

  1. Changes
    - Add timezone handling functions
    - Update appointment validation to use IST timezone
    - Fix slot availability checking
    - Add debug logging

  2. New Functions
    - convert_to_ist: Converts UTC timestamp to IST
    - is_valid_appointment_time: Validates appointment time
*/

-- Function to convert UTC to IST
CREATE OR REPLACE FUNCTION convert_to_ist(p_timestamp timestamptz)
RETURNS timestamptz AS $$
BEGIN
  RETURN p_timestamp AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata';
END;
$$ LANGUAGE plpgsql;

-- Function to validate appointment time
CREATE OR REPLACE FUNCTION is_valid_appointment_time(
  p_date date,
  p_time time,
  p_buffer_minutes int DEFAULT 30
) RETURNS boolean AS $$
DECLARE
  v_ist_now timestamptz;
  v_appointment_time timestamptz;
BEGIN
  -- Get current time in IST
  v_ist_now := convert_to_ist(now());
  
  -- Convert appointment date/time to timestamptz in IST
  v_appointment_time := (p_date || ' ' || p_time)::timestamptz AT TIME ZONE 'Asia/Kolkata';
  
  -- Add buffer time to current time
  v_ist_now := v_ist_now + (p_buffer_minutes || ' minutes')::interval;
  
  -- Check if appointment time is after current time + buffer
  RETURN v_appointment_time > v_ist_now;
END;
$$ LANGUAGE plpgsql;

-- Drop existing appointment validation function and recreate
DROP FUNCTION IF EXISTS validate_appointment_slot CASCADE;

CREATE OR REPLACE FUNCTION validate_appointment_slot()
RETURNS trigger AS $$
DECLARE
  v_ist_now timestamptz;
  v_appointment_time timestamptz;
  v_debug_info jsonb;
BEGIN
  -- Build debug info
  v_debug_info := jsonb_build_object(
    'doctor_id', NEW.doctor_id,
    'date', NEW.appointment_date,
    'time', NEW.appointment_time,
    'current_time', now()
  );
  
  RAISE LOG 'Validating appointment: %', v_debug_info;

  -- Check if appointment time is valid
  IF NOT is_valid_appointment_time(NEW.appointment_date, NEW.appointment_time) THEN
    RAISE LOG 'Invalid appointment time: %', v_debug_info;
    RAISE EXCEPTION 'Selected time slot is not available. Please choose a future time slot.';
  END IF;

  -- Check doctor availability
  IF NOT check_doctor_availability(NEW.doctor_id, NEW.appointment_date, NEW.appointment_time) THEN
    RAISE LOG 'Doctor not available: %', v_debug_info;
    RAISE EXCEPTION 'Selected time slot is not available. Please choose another time.';
  END IF;

  -- Check for conflicting appointments
  IF EXISTS (
    SELECT 1 
    FROM appointments
    WHERE doctor_id = NEW.doctor_id
      AND appointment_date = NEW.appointment_date
      AND appointment_time = NEW.appointment_time
      AND status != 'cancelled'
      AND id != NEW.id  -- Allow updating own appointment
  ) THEN
    RAISE LOG 'Slot already booked: %', v_debug_info;
    RAISE EXCEPTION 'This appointment slot is already booked';
  END IF;

  RAISE LOG 'Appointment validated successfully: %', v_debug_info;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger
CREATE TRIGGER check_appointment_slot_trigger
  BEFORE INSERT OR UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION validate_appointment_slot();

-- Update the appointments table constraints
ALTER TABLE appointments DROP CONSTRAINT IF EXISTS future_appointment;
ALTER TABLE appointments ADD CONSTRAINT future_appointment 
  CHECK (is_valid_appointment_time(appointment_date, appointment_time));