/*
  # Create Staff Users Table and Add Test Data
  
  1. Database Setup
    - Enable pgcrypto extension
    - Create staff_users table with proper constraints
    - Create login function for authentication
  
  2. Test Data
    - Add admin user
    - Add doctor accounts
    - Add receptionist account
    
  3. Security
    - Passwords are hashed using pgcrypto
    - Role-based access control
    - Secure login function
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

-- Insert test users with hashed passwords
INSERT INTO staff_users (username, password_hash, role)
VALUES
  -- Admin user (password: admin123)
  ('admin', crypt('admin123', gen_salt('bf')), 'admin'),
  
  -- Doctor accounts
  -- Dr. N.SWAPNA (password: swapna123)
  ('dr.swapna', crypt('swapna123', gen_salt('bf')), 'doctor'),
  
  -- Dr. Bysani NAVEEN KUMAR (password: naveen123)
  ('dr.naveen', crypt('naveen123', gen_salt('bf')), 'doctor'),
  
  -- Receptionist (password: reception123)
  ('reception', crypt('reception123', gen_salt('bf')), 'receptionist')
ON CONFLICT (username) DO NOTHING;