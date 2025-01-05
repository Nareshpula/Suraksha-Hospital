/*
  # Fix Login Function
  
  1. Changes
    - Drop and recreate login_staff function with proper error handling
    - Add proper return type definition
    - Improve security with rate limiting
  
  2. Security
    - Password comparison using pgcrypto
    - Rate limiting for failed attempts
    - Proper error messages
*/

-- Drop existing function if exists
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
  FROM auth.audit_log_entries
  WHERE event = 'LOGIN_FAILED'
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
    INSERT INTO auth.audit_log_entries (
      instance_id,
      ip_address,
      event,
      created_at
    ) VALUES (
      gen_random_uuid(),
      inet_client_addr(),
      'LOGIN_FAILED',
      NOW()
    );

    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid username or password'
    );
  END IF;

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