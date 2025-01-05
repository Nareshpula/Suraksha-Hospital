/*
  # Add Schema Version Tracking
  
  1. New Table
    - schema_versions
      - id (uuid, primary key)
      - version (text)
      - applied_at (timestamptz)
      
  2. Security
    - Enable RLS on schema_versions table
    - Restrict access to authenticated users
*/

-- Create schema version tracking
CREATE TABLE IF NOT EXISTS schema_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version text NOT NULL,
  applied_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE schema_versions ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated access only
CREATE POLICY "Allow authenticated users to view schema versions"
  ON schema_versions FOR SELECT
  TO authenticated
  USING (true);

-- Insert initial version
INSERT INTO schema_versions (version)
VALUES ('1.0.0')
ON CONFLICT DO NOTHING;