-- Enable http extension
CREATE EXTENSION IF NOT EXISTS http;

-- Update send_sms function with better error handling
CREATE OR REPLACE FUNCTION send_sms(
  p_phone_number text,
  p_message text,
  p_type text DEFAULT 'confirmation'
)
RETURNS jsonb AS $$
DECLARE
  v_api_key text;
  v_url text;
  v_response jsonb;
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

  BEGIN
    -- Make HTTP request to Fast2SMS API
    SELECT content::jsonb INTO v_response
    FROM http((
      'POST',
      v_url,
      ARRAY[
        ('Authorization', v_api_key),
        ('Content-Type', 'application/json')
      ],
      'application/json',
      jsonb_build_object(
        'route', CASE WHEN p_type = 'otp' THEN 'otp' ELSE 'v3' END,
        'sender_id', 'SURAKSHA',
        'message', p_message,
        'language', 'english',
        'flash', CASE WHEN p_type = 'otp' THEN 1 ELSE 0 END,
        'numbers', p_phone_number
      )::text
    ));

    RETURN jsonb_build_object(
      'success', true,
      'response', v_response
    );
  EXCEPTION 
    WHEN OTHERS THEN
      RETURN jsonb_build_object(
        'success', false,
        'message', SQLERRM
      );
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update send_otp function with better error handling
CREATE OR REPLACE FUNCTION send_otp(
  p_phone_number text,
  p_otp text
)
RETURNS jsonb AS $$
DECLARE
  v_message text;
  v_response jsonb;
BEGIN
  v_message := 'Your OTP for Suraksha Hospital is: ' || p_otp || '. Valid for 5 minutes.';
  
  SELECT * INTO v_response 
  FROM send_sms(p_phone_number, v_message, 'otp');
  
  RETURN v_response;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;