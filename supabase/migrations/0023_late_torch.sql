/*
  # Fix OTP Verification Policies

  1. Changes
    - Simplify RLS policies for OTP verification
    - Remove unnecessary conditions
    - Add proper indexes
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public to create OTP verifications" ON otp_verifications;
DROP POLICY IF EXISTS "Allow public to verify OTP" ON otp_verifications;
DROP POLICY IF EXISTS "Allow public to mark OTP as verified" ON otp_verifications;

-- Create simpler policies
CREATE POLICY "Allow public to create OTP verifications"
  ON otp_verifications FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public to verify OTP"
  ON otp_verifications FOR SELECT
  TO public
  USING (phone_number = current_user);

CREATE POLICY "Allow public to mark OTP as verified"
  ON otp_verifications FOR UPDATE
  TO public
  USING (phone_number = current_user);

-- Add missing index
CREATE INDEX IF NOT EXISTS idx_otp_combined ON otp_verifications(phone_number, otp_code, verified);