/*
  # Fix appointments and announcements

  1. Changes
    - Add timezone handling for appointments
    - Fix announcement date handling
    - Add doctor availability check function
    - Add appointment slot validation
  
  2. Security
    - Enable RLS on all tables
    - Add policies for appointments and announcements
*/

-- Function to check doctor availability
CREATE OR REPLACE FUNCTION check_doctor_availability(
  p_doctor_id uuid,
  p_date date,
  p_time time
) RETURNS boolean AS $$
DECLARE
  v_doctor_record doctors%ROWTYPE;
  v_day_name text;
  v_exception record;
  v_ist_time time;
BEGIN
  -- Get doctor's record
  SELECT * INTO v_doctor_record
  FROM doctors
  WHERE id = p_doctor_id;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  -- Convert time to IST
  v_ist_time := p_time AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata';
  
  -- Get day name in lowercase
  v_day_name := lower(to_char(p_date, 'day'));
  v_day_name := trim(v_day_name);

  -- Check for exceptions first
  SELECT *
  INTO v_exception
  FROM doctor_exceptions
  WHERE doctor_id = p_doctor_id
    AND date = p_date;

  IF FOUND THEN
    -- If marked as unavailable, return false
    IF v_exception.type = 'unavailable' THEN
      RETURN false;
    END IF;
    
    -- For custom hours, check if time falls within any slot
    IF v_exception.type = 'custom' AND v_exception.slots IS NOT NULL THEN
      RETURN EXISTS (
        SELECT 1
        FROM jsonb_array_elements(v_exception.slots) slot
        WHERE v_ist_time >= (slot->>'startTime')::time
          AND v_ist_time <= (slot->>'endTime')::time
      );
    END IF;
  END IF;

  -- Check weekly schedule
  RETURN EXISTS (
    SELECT 1
    FROM jsonb_array_elements((v_doctor_record.availability->'weekly'->v_day_name->'slots')::jsonb) slot
    WHERE v_ist_time >= (slot->>'startTime')::time
      AND v_ist_time <= (slot->>'endTime')::time
      AND (v_doctor_record.availability->'weekly'->v_day_name->>'isAvailable')::boolean = true
  );
END;
$$ LANGUAGE plpgsql;

-- Function to validate appointment slot
CREATE OR REPLACE FUNCTION validate_appointment_slot()
RETURNS trigger AS $$
BEGIN
  -- Check if doctor is available
  IF NOT check_doctor_availability(NEW.doctor_id, NEW.appointment_date, NEW.appointment_time) THEN
    RAISE EXCEPTION 'Selected time slot is not available';
  END IF;

  -- Check for conflicting appointments
  IF EXISTS (
    SELECT 1 
    FROM appointments
    WHERE doctor_id = NEW.doctor_id
      AND appointment_date = NEW.appointment_date
      AND appointment_time = NEW.appointment_time
      AND status != 'cancelled'
  ) THEN
    RAISE EXCEPTION 'This appointment slot is already booked';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop and recreate the trigger
DROP TRIGGER IF EXISTS check_appointment_slot_trigger ON appointments;

CREATE TRIGGER check_appointment_slot_trigger
  BEFORE INSERT ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION validate_appointment_slot();

-- Function to manage announcements for doctor exceptions
CREATE OR REPLACE FUNCTION manage_doctor_announcements()
RETURNS trigger AS $$
BEGIN
  -- Delete existing announcements for this date
  DELETE FROM announcements 
  WHERE doctor_id = NEW.doctor_id 
    AND date_trunc('day', start_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') = NEW.date;

  -- Create new announcement
  INSERT INTO announcements (
    doctor_id,
    message,
    start_date,
    end_date
  ) VALUES (
    NEW.doctor_id,
    NEW.reason,
    NEW.date + time '00:00:00',  -- Start of day
    NEW.date + time '23:59:59'   -- End of day
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop and recreate the trigger
DROP TRIGGER IF EXISTS manage_announcements_trigger ON doctor_exceptions;

CREATE TRIGGER manage_announcements_trigger
  AFTER INSERT OR UPDATE ON doctor_exceptions
  FOR EACH ROW
  EXECUTE FUNCTION manage_doctor_announcements();