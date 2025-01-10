-- Create function to send SMS via Fast2SMS
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
    v_request_body := jsonb_build_object(
      'route', 'otp',
      'variables_values', p_message,
      'numbers', p_phone_number
    );
  ELSE
    v_request_body := jsonb_build_object(
      'route', 'v3',
      'sender_id', 'SURAKSHA',
      'message', p_message,
      'language', 'english',
      'flash', 0,
      'numbers', p_phone_number
    );
  END IF;

  -- Make HTTP request using http_post
  SELECT * INTO v_response FROM http_post(
    v_url,
    v_request_body::text,
    'application/json',
    ARRAY[
      ('Authorization', v_api_key)::http_header
    ]
  );

  -- Log response for debugging
  RAISE NOTICE 'SMS API Response: %', v_response;

  IF v_response.status = 200 THEN
    RETURN jsonb_build_object(
      'success', true,
      'response', v_response.content::jsonb
    );
  ELSE
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Failed to send SMS: ' || coalesce(v_response.content, 'Unknown error')
    );
  END IF;

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object(
    'success', false,
    'message', 'Error sending SMS: ' || SQLERRM
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update send_otp function to use new format
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

  -- Send OTP directly using variables_values
  SELECT * INTO v_response 
  FROM send_sms(p_phone_number, p_otp, 'otp');
  
  RETURN v_response;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;