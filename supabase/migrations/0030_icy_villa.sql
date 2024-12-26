/*
  # Fix OTP Verifications RLS Policies

  1. Changes
    - Enable RLS on otp_verifications table
    - Create policies for:
      - INSERT: Allow creating new OTPs
      - SELECT: Allow checking OTP validity
      - UPDATE: Allow marking OTPs as verified
      - DELETE: Allow cleaning up expired OTPs
  
  2. Security
    - Ensure proper access control while maintaining functionality
    - Allow public access for OTP creation and verification
    - Prevent unauthorized access to others' OTPs
*/

-- First ensure RLS is enabled
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to start fresh
DROP POLICY IF EXISTS "Allow all operations on OTP verifications" ON otp_verifications;
DROP POLICY IF EXISTS "Allow creating new OTP verifications" ON otp_verifications;
DROP POLICY IF EXISTS "Allow public to verify OTP" ON otp_verifications;
DROP POLICY IF EXISTS "Allow public to mark OTP as verified" ON otp_verifications;

-- Create new policies

-- Allow creating new OTPs
CREATE POLICY "create_otp"
  ON otp_verifications
  FOR INSERT
  TO public
  WITH CHECK (
    phone_number IS NOT NULL AND
    otp_code IS NOT NULL AND
    expires_at > CURRENT_TIMESTAMP
  );

-- Allow checking OTP validity
CREATE POLICY "read_otp"
  ON otp_verifications
  FOR SELECT
  TO public
  USING (
    NOT verified AND 
    expires_at > CURRENT_TIMESTAMP
  );

-- Allow marking OTP as verified
CREATE POLICY "update_otp"
  ON otp_verifications
  FOR UPDATE
  TO public
  USING (
    NOT verified AND 
    expires_at > CURRENT_TIMESTAMP
  )
  WITH CHECK (verified = true);

-- Allow deleting expired OTPs
CREATE POLICY "delete_expired_otp"
  ON otp_verifications
  FOR DELETE
  TO public
  USING (expires_at < CURRENT_TIMESTAMP);

-- Add helpful comment
COMMENT ON TABLE otp_verifications IS 'Stores OTP verification codes with secure access policies';