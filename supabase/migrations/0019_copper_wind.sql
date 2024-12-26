/*
  # Create OTP verification table and update appointments schema

  1. New Tables
    - `otp_verifications`
      - `id` (uuid, primary key)
      - `phone_number` (text)
      - `otp_code` (text)
      - `expires_at` (timestamptz)
      - `verified` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `otp_verifications` table
    - Add policies for OTP verification
*/

-- Create OTP verifications table
CREATE TABLE IF NOT EXISTS otp_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL,
  otp_code text NOT NULL,
  expires_at timestamptz NOT NULL,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_phone CHECK (phone_number ~ '^[6-9]\d{9}$')
);

-- Create indexes for faster lookups
CREATE INDEX idx_otp_phone_number ON otp_verifications(phone_number);
CREATE INDEX idx_otp_expires_at ON otp_verifications(expires_at);

-- Enable RLS
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public to create OTP verifications"
  ON otp_verifications FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public to verify OTP"
  ON otp_verifications FOR SELECT
  TO public
  USING (
    phone_number = current_user AND
    verified = false AND
    expires_at > now()
  );

CREATE POLICY "Allow public to mark OTP as verified"
  ON otp_verifications FOR UPDATE
  TO public
  USING (
    phone_number = current_user AND
    verified = false AND
    expires_at > now()
  )
  WITH CHECK (verified = true);