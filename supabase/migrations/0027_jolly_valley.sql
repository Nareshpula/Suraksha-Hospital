/*
  # Fix OTP Verification System

  1. New Tables
    - `otp_verifications`
      - `id` (uuid, primary key)
      - `phone_number` (text, with validation)
      - `otp_code` (text, with validation)
      - `expires_at` (timestamptz)
      - `verified` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add data validation constraints
    - Add proper indexing
*/

-- Drop existing table if exists
DROP TABLE IF EXISTS otp_verifications;

-- Create OTP verifications table
CREATE TABLE otp_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL,
  otp_code text NOT NULL,
  expires_at timestamptz NOT NULL,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_phone CHECK (phone_number ~ '^[6-9]\d{9}$'),
  CONSTRAINT valid_otp CHECK (otp_code ~ '^\d{6}$'),
  CONSTRAINT valid_expiry CHECK (expires_at > created_at)
);

-- Create indexes for performance
CREATE INDEX idx_otp_phone_number ON otp_verifications(phone_number);
CREATE INDEX idx_otp_expires_at ON otp_verifications(expires_at);
CREATE INDEX idx_otp_verified ON otp_verifications(verified);
CREATE INDEX idx_otp_combined ON otp_verifications(phone_number, otp_code, verified);

-- Enable RLS
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- Create simplified policy that allows all operations
CREATE POLICY "Allow all operations on OTP verifications"
  ON otp_verifications
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);