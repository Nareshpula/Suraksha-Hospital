-- Drop existing triggers and functions first
DROP TRIGGER IF EXISTS check_otp_rate_limit_trigger ON otp_verifications;
DROP FUNCTION IF EXISTS enforce_otp_rate_limit();
DROP FUNCTION IF EXISTS check_otp_rate_limit(text);
DROP FUNCTION IF EXISTS cleanup_expired_otps();
DROP FUNCTION IF EXISTS validate_otp(text, text);

-- Improved OTP validation function
CREATE OR REPLACE FUNCTION validate_otp(
  p_phone_number text,
  p_otp_code text
) RETURNS boolean AS $$
DECLARE
  v_otp_record otp_verifications%ROWTYPE;
BEGIN
  -- Delete any expired or verified OTPs for this phone number first
  DELETE FROM otp_verifications 
  WHERE phone_number = p_phone_number 
    AND (expires_at < now() OR verified = true);

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

  -- Delete any other OTPs for this phone number
  DELETE FROM otp_verifications 
  WHERE phone_number = p_phone_number 
    AND id != v_otp_record.id;

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Improved rate limiting function
CREATE OR REPLACE FUNCTION check_otp_rate_limit(
  p_phone_number text
) RETURNS boolean AS $$
DECLARE
  v_recent_attempts int;
  v_last_success timestamptz;
BEGIN
  -- Clean up old records first
  DELETE FROM otp_verifications 
  WHERE phone_number = p_phone_number 
    AND (expires_at < now() OR verified = true);

  -- Count recent attempts in last 5 minutes
  SELECT COUNT(*)
  INTO v_recent_attempts
  FROM otp_verifications
  WHERE phone_number = p_phone_number
    AND created_at > now() - interval '5 minutes';

  -- Get last successful verification
  SELECT MAX(created_at)
  INTO v_last_success
  FROM otp_verifications
  WHERE phone_number = p_phone_number
    AND verified = true;

  -- If there was a successful verification in the last minute, block new attempts
  IF v_last_success IS NOT NULL AND v_last_success > now() - interval '1 minute' THEN
    RETURN false;
  END IF;

  -- Allow max 3 attempts per 5 minutes
  RETURN v_recent_attempts < 3;
END;
$$ LANGUAGE plpgsql;

-- Improved rate limiting trigger
CREATE OR REPLACE FUNCTION enforce_otp_rate_limit()
RETURNS trigger AS $$
BEGIN
  -- Delete any existing unverified OTPs for this phone number
  DELETE FROM otp_verifications 
  WHERE phone_number = NEW.phone_number 
    AND NOT verified;

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

-- Create a manual cleanup function
CREATE OR REPLACE FUNCTION manual_cleanup_otps(p_phone_number text DEFAULT NULL)
RETURNS void AS $$
BEGIN
  IF p_phone_number IS NULL THEN
    -- Clean up all expired or verified OTPs
    DELETE FROM otp_verifications 
    WHERE expires_at < now() 
      OR verified = true;
  ELSE
    -- Clean up OTPs for specific phone number
    DELETE FROM otp_verifications 
    WHERE phone_number = p_phone_number
      AND (expires_at < now() OR verified = true);
  END IF;
END;
$$ LANGUAGE plpgsql;