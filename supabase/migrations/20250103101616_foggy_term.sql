-- First, create a custom settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS app_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access only
CREATE POLICY "Admin only access"
  ON app_settings
  USING (auth.role() = 'admin');

-- Store the API key
INSERT INTO app_settings (key, value)
VALUES ('FAST2SMS_API_KEY', 'OCAs6aBlJY4er89QZDjpIvXTkqbxKugWNdGwSHfMnmctoLE0y1XalLBSPQeqvG1rnshto84uFDjOyiVb')
ON CONFLICT (key) DO UPDATE
  SET value = EXCLUDED.value,
      updated_at = now();

-- Create function to get settings
CREATE OR REPLACE FUNCTION get_setting(p_key text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN (SELECT value FROM app_settings WHERE key = p_key);
END;
$$;