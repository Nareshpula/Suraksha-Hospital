-- Create OTP verifications table
CREATE TABLE IF NOT EXISTS otp_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL,
  otp_code text NOT NULL,
  expires_at timestamptz NOT NULL,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
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

-- Create index for faster lookups
CREATE INDEX idx_otp_verifications_phone_expiry 
  ON otp_verifications(phone_number, expires_at)
  WHERE NOT verified;

-- Function to clean up expired OTPs
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM otp_verifications 
  WHERE expires_at < NOW() 
    OR verified = true;
END;
$$ LANGUAGE plpgsql;

-- Schedule cleanup job
SELECT cron.schedule(
  'cleanup-expired-otps',
  '*/5 * * * *',  -- Run every 5 minutes
  'SELECT cleanup_expired_otps()'
);