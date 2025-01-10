/*
  # Fix triggers and functions order

  1. Changes
    - Fix dependency order for dropping triggers and functions
    - Add proper error handling
    - Improve logging
  
  2. Security
    - Maintain existing RLS policies
*/

-- First drop triggers to resolve dependencies
DROP TRIGGER IF EXISTS check_appointment_slot_trigger ON appointments;
DROP TRIGGER IF EXISTS manage_announcements_trigger ON doctor_exceptions;

-- Then drop functions
DROP FUNCTION IF EXISTS validate_appointment_slot();
DROP FUNCTION IF EXISTS manage_doctor_announcements();
DROP FUNCTION IF EXISTS check_doctor_availability(uuid, date, time);

-- Recreate functions and triggers in correct order
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
  v_debug_info jsonb;
BEGIN
  -- Get doctor's record
  SELECT * INTO v_doctor_record
  FROM doctors
  WHERE id = p_doctor_id;

  IF NOT FOUND THEN
    RAISE LOG 'Doctor not found: %', p_doctor_id;
    RETURN false;
  END IF;

  -- Convert time to IST
  v_ist_time := p_time;
  
  -- Get day name in lowercase
  v_day_name := lower(trim(to_char(p_date, 'day')));
  
  v_debug_info := jsonb_build_object(
    'doctor_id', p_doctor_id,
    'date', p_date,
    'time', v_ist_time,
    'day_name', v_day_name
  );
  
  RAISE LOG 'Checking availability: %', v_debug_info;

  -- Check for exceptions first
  SELECT *
  INTO v_exception
  FROM doctor_exceptions
  WHERE doctor_id = p_doctor_id
    AND date = p_date;

  IF FOUND THEN
    RAISE LOG 'Found exception: %', row_to_json(v_exception);
    
    -- If marked as unavailable, return false
    IF v_exception.type = 'unavailable' THEN
      RAISE LOG 'Doctor unavailable on %', p_date;
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

-- Recreate appointment validation function
CREATE OR REPLACE FUNCTION validate_appointment_slot()
RETURNS trigger AS $$
DECLARE
  v_is_available boolean;
  v_debug_info jsonb;
BEGIN
  v_debug_info := jsonb_build_object(
    'doctor_id', NEW.doctor_id,
    'date', NEW.appointment_date,
    'time', NEW.appointment_time
  );
  
  RAISE LOG 'Validating appointment slot: %', v_debug_info;

  -- Check if doctor is available
  SELECT check_doctor_availability(NEW.doctor_id, NEW.appointment_date, NEW.appointment_time)
  INTO v_is_available;
  
  IF NOT v_is_available THEN
    RAISE LOG 'Doctor not available: %', v_debug_info;
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
    RAISE LOG 'Slot already booked: %', v_debug_info;
    RAISE EXCEPTION 'This appointment slot is already booked';
  END IF;

  RAISE LOG 'Appointment slot validated successfully: %', v_debug_info;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate announcement management function
CREATE OR REPLACE FUNCTION manage_doctor_announcements()
RETURNS trigger AS $$
DECLARE
  v_start_date timestamptz;
  v_end_date timestamptz;
BEGIN
  -- Set announcement times in IST
  v_start_date := (NEW.date || ' 00:00:00')::timestamptz AT TIME ZONE 'Asia/Kolkata';
  v_end_date := (NEW.date || ' 23:59:59')::timestamptz AT TIME ZONE 'Asia/Kolkata';

  -- Delete existing announcements for this date
  DELETE FROM announcements 
  WHERE doctor_id = NEW.doctor_id 
    AND date_trunc('day', start_date AT TIME ZONE 'Asia/Kolkata') = NEW.date;

  -- Create new announcement
  INSERT INTO announcements (
    doctor_id,
    message,
    start_date,
    end_date
  ) VALUES (
    NEW.doctor_id,
    NEW.reason,
    v_start_date,
    v_end_date
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Finally recreate triggers
CREATE TRIGGER check_appointment_slot_trigger
  BEFORE INSERT ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION validate_appointment_slot();

CREATE TRIGGER manage_announcements_trigger
  AFTER INSERT OR UPDATE ON doctor_exceptions
  FOR EACH ROW
  EXECUTE FUNCTION manage_doctor_announcements();