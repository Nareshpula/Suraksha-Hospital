-- Drop existing functions to recreate them
DROP FUNCTION IF EXISTS send_sms CASCADE;
DROP FUNCTION IF EXISTS send_otp CASCADE;
DROP FUNCTION IF EXISTS send_appointment_confirmation CASCADE;

-- Create improved send_sms function with fixed HTTP request
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

  -- Make HTTP request using http_post directly
  SELECT * INTO v_response FROM http_post(
    v_url,
    jsonb_build_object(
      'route', CASE WHEN p_type = 'otp' THEN 'otp' ELSE 'v3' END,
      'sender_id', 'SURAKSHA',
      'message', p_message,
      'language', 'english',
      'flash', CASE WHEN p_type = 'otp' THEN 1 ELSE 0 END,
      'numbers', p_phone_number
    )::text,
    'application/json',
    ARRAY[
      ('Authorization', v_api_key)::http_header
    ]
  );

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

-- Create improved send_otp function
CREATE OR REPLACE FUNCTION send_otp(
  p_phone_number text,
  p_otp text
)
RETURNS jsonb AS $$
DECLARE
  v_message text;
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

  v_message := 'Your OTP for Suraksha Hospital is: ' || p_otp || '. Valid for 5 minutes.';
  
  SELECT * INTO v_response 
  FROM send_sms(p_phone_number, v_message, 'otp');
  
  -- Log the response for debugging
  RAISE NOTICE 'SMS Response: %', v_response;
  
  RETURN v_response;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create improved appointment confirmation function
CREATE OR REPLACE FUNCTION send_appointment_confirmation(
  p_phone_number text,
  p_doctor_name text,
  p_date text,
  p_time text
)
RETURNS jsonb AS $$
DECLARE
  v_message text;
  v_response jsonb;
BEGIN
  -- Validate phone number
  IF NOT p_phone_number ~ '^[6-9]\d{9}$' THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid phone number format'
    );
  END IF;

  v_message := 'Your appointment with ' || p_doctor_name || ' is confirmed for ' ||
               p_date || ' at ' || p_time || '. Location: Suraksha Hospital, Madanapalle. ' ||
               'For queries: 08571-220345';
  
  SELECT * INTO v_response 
  FROM send_sms(p_phone_number, v_message, 'confirmation');
  
  RETURN v_response;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;