-- Update send_appointment_confirmation function to use patient name
CREATE OR REPLACE FUNCTION send_appointment_confirmation(
  p_phone_number text,
  p_patient_name text,  -- Changed from p_doctor_name to p_patient_name
  p_date text,
  p_time text
)
RETURNS jsonb AS $$
DECLARE
  v_variables text;
  v_response jsonb;
BEGIN
  -- Validate phone number
  IF NOT p_phone_number ~ '^[6-9]\d{9}$' THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid phone number format'
    );
  END IF;

  -- Format variables for template
  -- Template: Dear {#var#}, your appointment at Bysani Suraksha Hospital, Madanapalle is confirmed for {#var#} at {#var#}
  v_variables := p_patient_name || '|' || p_date || '|' || p_time;
  
  SELECT * INTO v_response 
  FROM send_sms(p_phone_number, v_variables, 'confirmation');
  
  RETURN v_response;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;