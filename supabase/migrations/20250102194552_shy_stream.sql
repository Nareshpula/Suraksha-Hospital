/*
  # Add RLS policies for appointments table
  
  1. Changes
    - Enable RLS on appointments table
    - Add policies for staff access
    - Add policies for public access
  
  2. Security
    - Staff users can view and manage all appointments
    - Public users can only view their own appointments
    - Public users can create appointments
*/

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policy for staff users to manage all appointments
CREATE POLICY "Staff can manage all appointments"
ON appointments
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM staff_users 
    WHERE username = auth.jwt()->>'preferred_username'
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