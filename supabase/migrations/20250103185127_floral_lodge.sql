/*
  # Disable Rate Limiting
  
  1. Drop existing rate limiting triggers and functions
  2. Create dummy functions that always allow requests
  3. Update OTP verification to skip rate limiting
*/

-- First drop the trigger
DROP TRIGGER IF EXISTS check_otp_rate_limit_trigger ON otp_verifications;

-- Then drop the functions
DROP FUNCTION IF EXISTS enforce_otp_rate_limit();
DROP FUNCTION IF EXISTS check_otp_rate_limit(text);

-- Create dummy rate limiting function that always returns true
CREATE OR REPLACE FUNCTION check_otp_rate_limit(p_phone_number text)
RETURNS boolean AS $$
BEGIN
  -- Log attempt for monitoring
  RAISE NOTICE 'Rate limit check bypassed for: %', p_phone_number;
  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Create dummy enforce function that does nothing
CREATE OR REPLACE FUNCTION enforce_otp_rate_limit()
RETURNS trigger AS $$
BEGIN
  -- Always allow the operation
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger with dummy function
CREATE TRIGGER check_otp_rate_limit_trigger
  BEFORE INSERT ON otp_verifications
  FOR EACH ROW
  EXECUTE FUNCTION enforce_otp_rate_limit();

-- Update manual cleanup function to skip rate limiting
CREATE OR REPLACE FUNCTION manual_cleanup_otps(p_phone_number text)
RETURNS void AS $$
BEGIN
  -- Simply delete old OTPs without any rate limiting
  DELETE FROM otp_verifications 
  WHERE phone_number = p_phone_number
    AND (expires_at < now() OR verified = true);
END;
$$ LANGUAGE plpgsql;