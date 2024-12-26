/*
  # Fix Doctor IDs

  1. Changes
    - Update existing doctor records with proper UUIDs
    - Ensure doctor_id references are valid UUIDs

  2. Security
    - No changes to RLS policies
*/

-- Update existing doctor records with proper UUIDs
UPDATE doctors 
SET id = '123e4567-e89b-12d3-a456-426614174000'
WHERE name = 'Dr. N.SWAPNA';

UPDATE doctors 
SET id = '123e4567-e89b-12d3-a456-426614174001'
WHERE name = 'Dr.Bysani NAVEEN KUMAR';