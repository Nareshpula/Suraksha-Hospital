/*
  # Fix Doctor Records

  1. Changes
    - Ensure doctor records exist with correct UUIDs
    - Add proper doctor information

  2. Security
    - No changes to RLS policies
*/

-- First ensure the doctors table exists
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialty text NOT NULL,
  qualification text NOT NULL,
  experience text,
  availability jsonb,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Delete any existing records to avoid conflicts
DELETE FROM doctors WHERE name IN ('Dr. N.SWAPNA', 'Dr.Bysani NAVEEN KUMAR');

-- Insert doctors with specific UUIDs
INSERT INTO doctors (id, name, specialty, qualification, experience, image_url)
VALUES 
  (
    '123e4567-e89b-12d3-a456-426614174000',
    'Dr. N.SWAPNA',
    'Paediatrics Specialist',
    'M.B.B.S, MD, IAP-Fellowship in Neonatology (Fernandez Hospital, Hyderabad)',
    'Senior Consultant',
    'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg'
  ),
  (
    '123e4567-e89b-12d3-a456-426614174001',
    'Dr.Bysani NAVEEN KUMAR',
    'General Medicine, Physician & Diabetologist',
    'M.B.B.S., M.D General Medicine',
    'Senior Consultant',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d'
  )
ON CONFLICT (id) DO UPDATE 
SET 
  name = EXCLUDED.name,
  specialty = EXCLUDED.specialty,
  qualification = EXCLUDED.qualification,
  experience = EXCLUDED.experience,
  image_url = EXCLUDED.image_url;