/*
  # Add Staff Users Schema

  1. New Tables
    - `staff_users`
      - `id` (uuid, primary key) 
      - `username` (text, unique)
      - `password_hash` (text)
      - `role` (enum: admin, doctor, receptionist)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `last_login` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for authentication
*/

-- Create staff roles enum
CREATE TYPE staff_role AS ENUM ('admin', 'doctor', 'receptionist');

-- Create staff users table
CREATE TABLE IF NOT EXISTS staff_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role staff_role NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz,
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Enable RLS
ALTER TABLE staff_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow staff to view own profile"
  ON staff_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create function to handle staff login
CREATE OR REPLACE FUNCTION login_staff(
  p_username text,
  p_password text
) RETURNS json AS $$
DECLARE
  v_user staff_users;
  v_token text;
BEGIN
  -- Get user if credentials match
  SELECT * INTO v_user
  FROM staff_users
  WHERE username = p_username 
  AND password_hash = crypt(p_password, password_hash)
  AND is_active = true;

  -- If no user found, return error
  IF v_user IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'message', 'Invalid credentials'
    );
  END IF;

  -- Update last login
  UPDATE staff_users 
  SET last_login = now()
  WHERE id = v_user.id;

  -- Return success with user info
  RETURN json_build_object(
    'success', true,
    'user', json_build_object(
      'id', v_user.id,
      'username', v_user.username,
      'role', v_user.role
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;