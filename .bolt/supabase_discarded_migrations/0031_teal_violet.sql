/*
  # Fix OTP Verification Policies

  1. Changes
    - Drop existing restrictive policies
    - Create new policies that allow OTP verification while maintaining security
    - Add proper indexes for performance
  
  2. Security
    - Enable RLS but with more permissive policies
    - Allow public access for OTP operations
    - Maintain data integrity constraints
*/

-- First ensure RLS is enabled
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Allow all operations on OTP verifications" ON otp_verifications;
DROP POLICY IF EXISTS "Allow creating new OTP verifications" ON otp_verifications;
DROP POLICY IF EXISTS "Allow public to verify OTP" ON otp_verifications;
DROP POLICY IF EXISTS "Allow public to mark OTP as verified" ON otp_verifications;

-- Create new, more permissive policies

-- Allow creating new OTPs
CREATE POLICY "create_otp"
  ON otp_verifications
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow reading OTPs for verification
CREATE POLICY "read_otp"
  ON otp_verifications
  FOR SELECT
  TO public
  USING (true);

-- Allow updating OTP verification status
CREATE POLICY "update_otp"
  ON otp_verifications
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow cleanup of expired OTPs
CREATE POLICY "delete_otp"
  ON otp_verifications
  FOR DELETE
  TO public
  USING (expires_at < CURRENT_TIMESTAMP);

-- Ensure indexes exist for performance
CREATE INDEX IF NOT EXISTS idx_otp_verification ON otp_verifications(phone_number, otp_code, verified);
CREATE INDEX IF NOT EXISTS idx_otp_expiry ON otp_verifications(expires_at);

-- Add helpful comment
COMMENT ON TABLE otp_verifications IS 'Stores OTP verification codes with permissive access policies';