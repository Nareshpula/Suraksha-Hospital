/*
  # Update doctor availability to include Sundays

  1. Changes
    - Updates default availability for all doctors to include Sunday slots
    - Sets Sunday hours from 10:00 AM to 2:00 PM
    - Ensures isAvailable is true for Sundays
*/

-- Update all existing doctors to include Sunday availability
UPDATE doctors
SET availability = jsonb_set(
  availability,
  '{weekly,sunday}',
  jsonb_build_object(
    'isAvailable', true,
    'slots', jsonb_build_array(
      jsonb_build_object(
        'startTime', '10:00',
        'endTime', '14:00'
      )
    )
  )
)
WHERE availability->'weekly'->'sunday'->>'isAvailable' = 'false'
   OR availability->'weekly'->'sunday' IS NULL;