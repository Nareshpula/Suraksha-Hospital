-- Update send_sms function to use correct template configuration
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
    -- For OTP messages
    v_request_body := jsonb_build_object(
      'route', 'v3',
      'sender_id', 'SRKHOP',
      'message', 'Your OTP for Suraksha Hospital is: ' || p_message || '. Valid for 5 minutes.',
      'numbers', p_phone_number,
      'flash', 0
    );
  ELSE
    -- For confirmation messages
    v_request_body := jsonb_build_object(
      'route', 'v3',
      'sender_id', 'SRKHOP',
      'message', p_message,
      'numbers', p_phone_number,
      'flash', 0
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

-- Update SMS templates to use standard format
UPDATE sms_templates 
SET template = CASE 
  WHEN type = 'otp' THEN 'Your OTP for Suraksha Hospital is: {{otp}}. Valid for 5 minutes.'
  WHEN type = 'appointment_confirmation' THEN 'Your appointment with {{doctor_name}} is confirmed for {{date}} at {{time}}. Location: Suraksha Hospital, Madanapalle. For queries: 08571-220345'
END,
updated_at = now()
WHERE type IN ('otp', 'appointment_confirmation');