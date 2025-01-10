/*
  # Fix Doctor Availability System

  1. New Tables
    - `doctor_exceptions` - Stores doctor unavailability and custom hours
      - `id` (uuid, primary key)
      - `doctor_id` (uuid, foreign key)
      - `date` (date)
      - `type` (enum: unavailable, custom)
      - `reason` (text)
      - `slots` (jsonb, for custom hours)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on new tables
    - Add policies for staff access
    - Add policies for public read access

  3. Changes
    - Add constraints and indexes for performance
    - Add trigger for announcement creation
*/

-- Create exception type enum
CREATE TYPE exception_type AS ENUM ('unavailable', 'custom');

-- Create doctor exceptions table
CREATE TABLE IF NOT EXISTS doctor_exceptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE,
  date date NOT NULL,
  type exception_type NOT NULL,
  reason text NOT NULL,
  slots jsonb DEFAULT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT unique_doctor_date UNIQUE (doctor_id, date)
);

-- Enable RLS
ALTER TABLE doctor_exceptions ENABLE ROW LEVEL SECURITY;

-- Policies for doctor_exceptions
CREATE POLICY "Public read access for doctor_exceptions"
  ON doctor_exceptions
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Staff can modify doctor_exceptions"
  ON doctor_exceptions
  USING (
    auth.role() IN ('admin', 'doctor', 'receptionist')
  );

-- Create indexes for performance
CREATE INDEX idx_doctor_exceptions_date ON doctor_exceptions(date);
CREATE INDEX idx_doctor_exceptions_doctor_date ON doctor_exceptions(doctor_id, date);

-- Function to validate slots JSON
CREATE OR REPLACE FUNCTION validate_slots()
RETURNS trigger AS $$
BEGIN
  IF NEW.type = 'custom' AND NEW.slots IS NULL THEN
    RAISE EXCEPTION 'Slots are required for custom type exceptions';
  END IF;

  IF NEW.type = 'unavailable' AND NEW.slots IS NOT NULL THEN
    RAISE EXCEPTION 'Slots should be null for unavailable type exceptions';
  END IF;

  IF NEW.type = 'custom' THEN
    -- Validate slots format
    IF NOT (
      jsonb_typeof(NEW.slots) = 'array' 
      AND jsonb_array_length(NEW.slots) > 0
    ) THEN
      RAISE EXCEPTION 'Invalid slots format';
    END IF;

    -- Validate each slot has startTime and endTime
    IF EXISTS (
      SELECT 1 FROM jsonb_array_elements(NEW.slots) slot
      WHERE NOT (
        slot ? 'startTime' 
        AND slot ? 'endTime'
        AND jsonb_typeof(slot->>'startTime') = 'string'
        AND jsonb_typeof(slot->>'endTime') = 'string'
      )
    ) THEN
      RAISE EXCEPTION 'Each slot must have startTime and endTime as strings';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for slots validation
CREATE TRIGGER validate_slots_trigger
  BEFORE INSERT OR UPDATE ON doctor_exceptions
  FOR EACH ROW
  EXECUTE FUNCTION validate_slots();

-- Function to create/update announcements
CREATE OR REPLACE FUNCTION manage_doctor_announcements()
RETURNS trigger AS $$
BEGIN
  -- Delete existing announcement for this date if any
  DELETE FROM announcements 
  WHERE doctor_id = NEW.doctor_id 
    AND date_trunc('day', start_date) = NEW.date;

  -- Create new announcement
  INSERT INTO announcements (
    doctor_id,
    message,
    start_date,
    end_date
  ) VALUES (
    NEW.doctor_id,
    NEW.reason,
    NEW.date + interval '0 hours',  -- Start of day
    NEW.date + interval '23 hours 59 minutes'  -- End of day
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for announcement management
CREATE TRIGGER manage_announcements_trigger
  AFTER INSERT OR UPDATE ON doctor_exceptions
  FOR EACH ROW
  EXECUTE FUNCTION manage_doctor_announcements();