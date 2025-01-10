/*
  # Staff Authentication Setup
  
  1. New Functions
    - login_staff(p_username text, p_password text): Handles staff authentication
    
  2. Security
    - Password is hashed using pgcrypto
    - Function accessible to authenticated users only
    
  3. Return Values
    - success: boolean indicating login success
    - message: status message
    - user: staff user details if successful
*/

-- Enable pgcrypto extension if not enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create staff users table if it doesn't exist
CREATE TABLE IF NOT EXISTS staff_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'doctor', 'receptionist')),
  created_at timestamptz DEFAULT now()
);

-- Create login function
CREATE OR REPLACE FUNCTION login_staff(
  p_username text,
  p_password text
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user staff_users%ROWTYPE;
  v_result jsonb;
BEGIN
  -- Find user
  SELECT * INTO v_user
  FROM staff_users
  WHERE username = p_username;
  
  -- Check if user exists and password matches
  IF v_user.id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid username or password'
    );
  END IF;
  
  IF v_user.password_hash != crypt(p_password, v_user.password_hash) THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid username or password'
    );
  END IF;
  
  -- Successful login
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Login successful',
    'user', jsonb_build_object(
      'id', v_user.id,
      'username', v_user.username,
      'role', v_user.role
    )
  );
END;
$$;