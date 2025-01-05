/*
  # Add last_appointment column to doctors table
  
  1. Changes
    - Add last_appointment column to doctors table to track the most recent appointment
    - Column is nullable and defaults to null
    - Uses timestamptz type for timezone awareness
*/

-- Add last_appointment column to doctors table
ALTER TABLE doctors 
ADD COLUMN IF NOT EXISTS last_appointment timestamptz DEFAULT NULL;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_doctors_last_appointment 
  ON doctors(last_appointment);

-- Add comment for documentation
COMMENT ON COLUMN doctors.last_appointment IS 
  'Timestamp of the most recent appointment booking, used for caching availability';