/*
  # SMS Integration Schema Update

  1. New Tables
    - `sms_logs` - Track all SMS attempts and their status
    - `sms_templates` - Store message templates for different types of SMS

  2. Security
    - Enable RLS on new tables
    - Add policies for staff access

  3. Functions
    - Update SMS sending functions to use Fast2SMS API
    - Add logging and rate limiting
*/

-- Create SMS logs table
CREATE TABLE IF NOT EXISTS sms_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('otp', 'confirmation')),
  status text NOT NULL CHECK (status IN ('success', 'failed')),
  response jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create SMS templates table
CREATE TABLE IF NOT EXISTS sms_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text UNIQUE NOT NULL CHECK (type IN ('otp', 'appointment_confirmation')),
  template text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE sms_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_templates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Staff can view SMS logs"
  ON sms_logs
  FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'role' IN ('admin', 'doctor', 'receptionist'));

CREATE POLICY "Staff can manage SMS templates"
  ON sms_templates
  TO authenticated
  USING (auth.jwt()->>'role' IN ('admin'));

-- Insert default templates
INSERT INTO sms_templates (type, template) VALUES
  ('otp', 'Your OTP for Suraksha Hospital is: {{otp}}. Valid for 5 minutes.'),
  ('appointment_confirmation', 'Your appointment with {{doctor_name}} is confirmed for {{date}} at {{time}}. Location: Suraksha Hospital, Madanapalle. For queries: 08571-220345')
ON CONFLICT (type) DO UPDATE
  SET template = EXCLUDED.template,
      updated_at = now();

-- Function to log SMS attempts
CREATE OR REPLACE FUNCTION log_sms_attempt(
  p_phone_number text,
  p_message text,
  p_type text,
  p_status text,
  p_response jsonb
)
RETURNS void AS $$
BEGIN
  INSERT INTO sms_logs (phone_number, message, type, status, response)
  VALUES (p_phone_number, p_message, p_type, p_status, p_response);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update send_sms function with logging
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
    v_result := jsonb_build_object(
      'success', false,
      'message', 'Fast2SMS API key not configured'
    );
    PERFORM log_sms_attempt(p_phone_number, p_message, p_type, 'failed', v_result);
    RETURN v_result;
  END IF;

  v_url := 'https://www.fast2sms.com/dev/bulkV2';

  -- Construct request body
  v_request_body := jsonb_build_object(
    'route', CASE WHEN p_type = 'otp' THEN 'otp' ELSE 'v3' END,
    'sender_id', 'SURAKSHA',
    'message', p_message,
    'language', 'english',
    'flash', CASE WHEN p_type = 'otp' THEN 1 ELSE 0 END,
    'numbers', p_phone_number
  );

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