/*
  # Disable Spam Protection and Update SMS Functions
  
  1. Temporarily disable spam protection
  2. Update SMS functions to bypass rate limiting
  3. Add logging for testing purposes
*/

-- Drop existing rate limiting functions
DROP FUNCTION IF EXISTS check_otp_rate_limit(text);
DROP FUNCTION IF EXISTS enforce_otp_rate_limit();

-- Create dummy rate limiting function that always returns true
CREATE OR REPLACE FUNCTION check_otp_rate_limit(p_phone_number text)
RETURNS boolean AS $$
BEGIN
  -- Log attempt for monitoring
  RAISE NOTICE 'Rate limit check bypassed for: %', p_phone_number;
  RETURN true;
END;
$$ LANGUAGE plpgsql;