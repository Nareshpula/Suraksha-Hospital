/*
  # Fix SMS Functions
  
  1. Update send_sms function to handle OTP route correctly
  2. Add proper request parameters for OTP messages
  3. Add logging for debugging
*/

-- Drop existing functions to recreate them
DROP FUNCTION IF EXISTS send_sms CASCADE;
DROP FUNCTION IF EXISTS send_otp CASCADE;

-- Create improved send_sms function
CREATE OR REPLACE FUNCTION send_sms(
  p_phone_number text,
  p_message text,
  p_type text DEFAULT 'confirmation'
)
RETURNS jsonb AS $$
DECLARE
  v_api_key text;
  v_url text;
  v_response http_response;
  v_request_body jsonb;
  v_result jsonb;
BEGIN
  -- Get API key from app_settings
  v_api_key := get_setting('FAST2SMS_API_KEY');
  IF v_api_key IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Fast2SMS API key not configured'
    );
  END IF;

  v_url := 'https://www.fast2sms.com/dev/bulkV2';

  -- Construct request body based on type
  IF p_type = 'otp' THEN
    -- For OTP route, use variables_values parameter
    v_request_body := jsonb_build_object(
      'route', 'otp',
      'variables_values', p_message,
      'numbers', p_phone_number
    );
  ELSE
    -- For regular messages, use message parameter
    v_request_body := jsonb_build_object(
      'route', 'v3',
      'sender_id', 'SURAKSHA',
      'message', p_message,
      'language', 'english',
      'flash', 0,
      'numbers', p_phone_number
    );
  END IF;

  -- Log request for debugging
  RAISE NOTICE 'SMS Request: %', v_request_body;

  -- Make HTTP request
  SELECT * INTO v_response FROM http((
    'POST',
    v_url,
    ARRAY[
      ('Authorization', v_api_key)::http_header,
      ('Content-Type', 'application/json')::http_header
    ],
    'application/json',
    v_request_body::text
  )::http_request);

  -- Log response for debugging
  RAISE NOTICE 'SMS Response: %', v_response;

  -- Parse response
  IF v_response.status = 200 THEN
    v_result := jsonb_build_object(
      'success', true,
      'response', v_response.content::jsonb
    );
  ELSE
    v_result := jsonb_build_object(
      'success', false,
      'message', 'Failed to send SMS: ' || coalesce(v_response.content, 'Unknown error')
    );
  END IF;

  -- Log attempt
  PERFORM log_sms_attempt(
    p_phone_number,
    p_message,
    p_type,
    CASE WHEN v_result->>'success' = 'true' THEN 'success' ELSE 'failed' END,
    v_result
  );

  RETURN v_result;

EXCEPTION WHEN OTHERS THEN
  v_result := jsonb_build_object(
    'success', false,
    'message', 'Error sending SMS: ' || SQLERRM
  );
  PERFORM log_sms_attempt(p_phone_number, p_message, p_type, 'failed', v_result);
  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create improved send_otp function
CREATE OR REPLACE FUNCTION send_otp(
  p_phone_number text,
  p_otp text
)
RETURNS jsonb AS $$
DECLARE
  v_response jsonb;
BEGIN
  -- Validate phone number
  IF NOT p_phone_number ~ '^[6-9]\d{9}$' THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid phone number format'
    );
  END IF;

  -- Validate OTP
  IF NOT p_otp ~ '^\d{6}$' THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid OTP format'
    );
  END IF;

  -- Send OTP using only the numeric value
  SELECT * INTO v_response 
  FROM send_sms(p_phone_number, p_otp, 'otp');
  
  RETURN v_response;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;