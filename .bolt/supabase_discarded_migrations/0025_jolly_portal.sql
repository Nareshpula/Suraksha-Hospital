/*
  # Fix OTP Verification System

  1. Changes
    - Drop existing OTP table and recreate with proper constraints
    - Add simpler RLS policies that allow public access
    - Add proper indexes for performance
    - Add proper constraints for data validation

  2. Security
    - Enable RLS with simplified policies
    - Add data validation constraints
    - Add proper indexing
*/

-- Drop existing table
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

-- Create indexes
CREATE INDEX idx_otp_phone_number ON otp_verifications(phone_number);
CREATE INDEX idx_otp_expires_at ON otp_verifications(expires_at);
CREATE INDEX idx_otp_verified ON otp_verifications(verified);
CREATE INDEX idx_otp_combined ON otp_verifications(phone_number, otp_code, verified);

-- Enable RLS
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- Create simplified policies
CREATE POLICY "Allow all operations on OTP verifications"
  ON otp_verifications
  TO public
  USING (true)
  WITH CHECK (true);