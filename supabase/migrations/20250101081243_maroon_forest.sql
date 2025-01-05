/*
  # Add OTP Verification System

  1. Tables
    - `otp_verifications`
      - `id` (uuid, primary key)
      - `phone_number` (text, with validation)
      - `otp_code` (text)
      - `expires_at` (timestamptz)
      - `verified` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for insert and update
    - Add phone number validation

  3. Maintenance
    - Add cleanup function for expired OTPs
    - Schedule cleanup job
*/

-- Create OTP verifications table
CREATE TABLE IF NOT EXISTS otp_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL,
  otp_code text NOT NULL,
  expires_at timestamptz NOT NULL,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  -- Validate Indian mobile numbers (starting with 6-9)
  CONSTRAINT valid_phone_number CHECK (phone_number ~ '^[6-9]\d{9}$')
);

-- Enable RLS
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public insert access for OTP verifications"
  ON otp_verifications
  FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

CREATE POLICY "Public update access for OTP verifications"
  ON otp_verifications
  FOR UPDATE
  TO PUBLIC
  USING (
    NOT verified 
    AND expires_at > now()
  )
  WITH CHECK (
    NOT verified 
    AND expires_at > now()
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_otp_verifications_phone_expiry 
  ON otp_verifications(phone_number, expires_at)
  WHERE NOT verified;

CREATE INDEX IF NOT EXISTS idx_otp_verifications_phone_verified 
  ON otp_verifications(phone_number, verified)
  WHERE NOT verified;

-- Function to validate OTP
CREATE OR REPLACE FUNCTION validate_otp(
  p_phone_number text,
  p_otp_code text
) RETURNS boolean AS $$
DECLARE
  v_otp_record otp_verifications%ROWTYPE;
BEGIN
  -- Find matching unverified OTP
  SELECT *
  INTO v_otp_record
  FROM otp_verifications
  WHERE phone_number = p_phone_number
    AND otp_code = p_otp_code
    AND NOT verified
    AND expires_at > now()
  ORDER BY created_at DESC
  LIMIT 1;

  -- Return false if no valid OTP found
  IF v_otp_record.id IS NULL THEN
    RETURN false;
  END IF;

  -- Mark OTP as verified
  UPDATE otp_verifications
  SET verified = true
  WHERE id = v_otp_record.id;

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up expired OTPs
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM otp_verifications 
  WHERE expires_at < NOW() 
    OR verified = true;
END;
$$ LANGUAGE plpgsql;

-- Schedule cleanup job (runs every 5 minutes)
SELECT cron.schedule(
  'cleanup-expired-otps',
  '*/5 * * * *',
  'SELECT cleanup_expired_otps()'
);

-- Function to handle OTP rate limiting
CREATE OR REPLACE FUNCTION check_otp_rate_limit(
  p_phone_number text
) RETURNS boolean AS $$
DECLARE
  v_recent_attempts int;
BEGIN
  -- Count recent attempts in last 5 minutes
  SELECT COUNT(*)
  INTO v_recent_attempts
  FROM otp_verifications
  WHERE phone_number = p_phone_number
    AND created_at > now() - interval '5 minutes';

  -- Allow max 3 attempts per 5 minutes
  RETURN v_recent_attempts < 3;
END;
$$ LANGUAGE plpgsql;

-- Trigger to enforce rate limiting
CREATE OR REPLACE FUNCTION enforce_otp_rate_limit()
RETURNS trigger AS $$
BEGIN
  IF NOT check_otp_rate_limit(NEW.phone_number) THEN
    RAISE EXCEPTION 'Too many OTP attempts. Please try again later.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_otp_rate_limit_trigger
  BEFORE INSERT ON otp_verifications
  FOR EACH ROW
  EXECUTE FUNCTION enforce_otp_rate_limit();