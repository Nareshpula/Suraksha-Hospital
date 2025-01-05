/*
  # Fix OTP Verification System

  1. New Tables
    - `otp_verifications` table for storing OTP codes
      - `id` (uuid, primary key)
      - `phone_number` (text)
      - `otp_code` (text)
      - `expires_at` (timestamptz)
      - `verified` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for OTP verification
    - Add constraints and indexes
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

-- Create indexes for faster lookups
CREATE INDEX idx_otp_phone_number ON otp_verifications(phone_number);
CREATE INDEX idx_otp_expires_at ON otp_verifications(expires_at);
CREATE INDEX idx_otp_verified ON otp_verifications(verified);
CREATE INDEX idx_otp_combined ON otp_verifications(phone_number, otp_code, verified);

-- Enable RLS
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- Create policies with simplified access rules
CREATE POLICY "Allow public to create OTP verifications"
  ON otp_verifications FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public to verify OTP"
  ON otp_verifications FOR SELECT
  TO public
  USING (phone_number = current_user);

CREATE POLICY "Allow public to mark OTP as verified"
  ON otp_verifications FOR UPDATE
  TO public
  USING (phone_number = current_user);