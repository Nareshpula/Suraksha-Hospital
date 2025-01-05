/*
  # Fix RLS policies for appointments table
  
  1. Changes
    - Drop existing policies
    - Create corrected policies for staff and public access
  
  2. Security
    - Staff users can view and manage all appointments using correct JWT field
    - Public users can only view their own appointments
    - Public users can create appointments
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Staff can manage all appointments" ON appointments;
DROP POLICY IF EXISTS "Public can create appointments" ON appointments;
DROP POLICY IF EXISTS "Public can view own appointments" ON appointments;
DROP POLICY IF EXISTS "Public insert access for appointments" ON appointments;
DROP POLICY IF EXISTS "Users can view own appointments" ON appointments;

-- Recreate policies with correct JWT field
CREATE POLICY "Staff can manage all appointments"
ON appointments
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM staff_users 
    WHERE username = auth.jwt()->>'username'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM staff_users 
    WHERE username = auth.jwt()->>'username'
  )
);

-- Policy for public to insert appointments
CREATE POLICY "Public can create appointments"
ON appointments
FOR INSERT
TO public
WITH CHECK (true);

-- Policy for public to view their own appointments
CREATE POLICY "Public can view own appointments"
ON appointments
FOR SELECT
TO public
USING (
  phone_number = current_setting('request.claims.phone_number', true)::text
);