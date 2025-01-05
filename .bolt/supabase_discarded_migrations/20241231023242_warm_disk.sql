/*
  # Fix Login Function and Add Audit Log
  
  1. Changes
    - Create audit_logs table for tracking login attempts
    - Update login_staff function to use new audit table
    - Add proper error handling and rate limiting
  
  2. Security
    - Store failed login attempts
    - Implement rate limiting
    - Secure password comparison
*/

-- Create audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  metadata jsonb
);

-- Enable RLS
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to view audit logs
CREATE POLICY "Allow admins to view audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM staff_users
    WHERE id = auth.uid()
    AND role = 'admin'
  ));

-- Drop existing function
DROP FUNCTION IF EXISTS login_staff;

-- Create improved login function
CREATE OR REPLACE FUNCTION login_staff(
  p_username text,
  p_password text
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user RECORD;
  v_failed_attempts int;
  v_last_attempt timestamptz;
BEGIN
  -- Check rate limiting
  SELECT COUNT(*), MAX(created_at)
  INTO v_failed_attempts, v_last_attempt
  FROM audit_logs
  WHERE event_type = 'LOGIN_FAILED'
    AND ip_address = inet_client_addr()
    AND created_at > NOW() - INTERVAL '15 minutes';

  -- Rate limit check: 5 attempts per 15 minutes
  IF v_failed_attempts >= 5 AND v_last_attempt > NOW() - INTERVAL '15 minutes' THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Too many failed attempts. Please try again later.'
    );
  END IF;

  -- Attempt to find user
  SELECT id, username, role
  INTO v_user
  FROM staff_users
  WHERE username = p_username
    AND password_hash = crypt(p_password, password_hash)
    AND is_active = true;

  -- Handle failed login
  IF v_user IS NULL THEN
    -- Log failed attempt
    INSERT INTO audit_logs (
      event_type,
      ip_address,
      metadata
    ) VALUES (
      'LOGIN_FAILED',
      inet_client_addr(),
      jsonb_build_object('username', p_username)
    );

    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid username or password'
    );
  END IF;

  -- Log successful login
  INSERT INTO audit_logs (
    event_type,
    ip_address,
    metadata
  ) VALUES (
    'LOGIN_SUCCESS',
    inet_client_addr(),
    jsonb_build_object(
      'user_id', v_user.id,
      'username', v_user.username
    )
  );

  -- Update last login timestamp
  UPDATE staff_users 
  SET last_login = NOW()
  WHERE id = v_user.id;

  -- Return success response
  RETURN jsonb_build_object(
    'success', true,
    'user', jsonb_build_object(
      'id', v_user.id,
      'username', v_user.username,
      'role', v_user.role
    )
  );
END;
$$;