/*
  # Fix Doctor Records

  1. Changes
    - Ensures doctors table exists with correct schema
    - Deletes any existing doctor records to avoid conflicts
    - Inserts doctors with specific UUIDs that match frontend data
    - Adds proper indexes for performance
  
  2. Security
    - Maintains existing RLS policies
*/

-- First ensure the doctors table exists with proper schema
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  specialty text NOT NULL,
  qualification text NOT NULL,
  experience text,
  availability jsonb,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS if not already enabled
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

-- Create index on doctor name for faster lookups
CREATE INDEX IF NOT EXISTS doctors_name_idx ON doctors(name);

-- Delete any existing records to avoid conflicts
DELETE FROM doctors;

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
  );

-- Verify RLS policies exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'doctors' AND policyname = 'Allow public to view doctors'
  ) THEN
    CREATE POLICY "Allow public to view doctors"
      ON doctors FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;