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
  v_response jsonb;
BEGIN
  -- Get API key from environment variable
  v_api_key := current_setting('FAST2SMS_API_KEY', true);
  v_url := 'https://www.fast2sms.com/dev/bulkV2';

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

  RETURN v_response;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to send OTP
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

-- Function to send appointment confirmation
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
  v_message := 'Your appointment with ' || p_doctor_name || ' is confirmed for ' ||
               p_date || ' at ' || p_time || '. Location: Suraksha Hospital, Madanapalle. ' ||
               'For queries: 08571-220345';
  
  SELECT * INTO v_response 
  FROM send_sms(p_phone_number, v_message, 'confirmation');
  
  RETURN v_response;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;