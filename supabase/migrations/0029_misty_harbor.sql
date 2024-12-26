/*
  # Set up OTP Verifications with RLS

  1. New Tables
    - `otp_verifications`
      - `id` (uuid, primary key)
      - `phone_number` (text, with validation)
      - `otp_code` (text, with validation)
      - `expires_at` (timestamptz)
      - `verified` (boolean)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS
    - Policies for:
      - INSERT: Allow creating new OTPs
      - SELECT: Only allow viewing unverified, non-expired OTPs for own phone number
      - UPDATE: Only allow marking own OTPs as verified
      - DELETE: Allow deleting expired OTPs
  
  3. Indexes
    - Phone number index
    - Expiration index
    - Combined index for verification
*/

-- Create OTP verifications table
CREATE TABLE IF NOT EXISTS otp_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL,
  otp_code text NOT NULL,
  expires_at timestamptz NOT NULL,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_phone CHECK (phone_number ~ '^[6-9]\d{9}$'),
  CONSTRAINT valid_otp CHECK (otp_code ~ '^\d{6}$'),
  CONSTRAINT valid_expiry CHECK (expires_at > created_at)
);

-- Create indexes for performance
CREATE INDEX idx_otp_phone_number ON otp_verifications(phone_number);
CREATE INDEX idx_otp_expires_at ON otp_verifications(expires_at);
CREATE INDEX idx_otp_verified ON otp_verifications(verified);
CREATE INDEX idx_otp_combined ON otp_verifications(phone_number, otp_code, verified);

-- Enable RLS
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow creating new OTP verifications"
  ON otp_verifications
  FOR INSERT
  TO public
  WITH CHECK (
    -- Ensure phone number format and expiry time are valid
    phone_number ~ '^[6-9]\d{9}$' AND
    expires_at > CURRENT_TIMESTAMP AND
    expires_at <= (CURRENT_TIMESTAMP + interval '1 hour')
  );

CREATE POLICY "Allow viewing own unverified OTPs"
  ON otp_verifications
  FOR SELECT
  TO public
  USING (
    -- Only allow viewing own unverified, non-expired OTPs
    phone_number = current_user AND
    NOT verified AND
    expires_at > CURRENT_TIMESTAMP
  );

CREATE POLICY "Allow verifying own OTPs"
  ON otp_verifications
  FOR UPDATE
  TO public
  USING (
    -- Only allow updating own unverified, non-expired OTPs
    phone_number = current_user AND
    NOT verified AND
    expires_at > CURRENT_TIMESTAMP
  )
  WITH CHECK (
    -- Only allow marking as verified
    verified = true AND
    phone_number = current_user
  );

CREATE POLICY "Allow deleting expired OTPs"
  ON otp_verifications
  FOR DELETE
  TO public
  USING (
    -- Allow deleting expired OTPs
    expires_at < CURRENT_TIMESTAMP OR
    (phone_number = current_user AND verified = true)
  );

-- Add comment for documentation
COMMENT ON TABLE otp_verifications IS 'Stores OTP verification codes with RLS policies for secure access';