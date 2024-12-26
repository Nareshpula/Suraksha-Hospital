-- Drop existing announcements table
DROP TABLE IF EXISTS announcements;

-- Create announcements table with proper timezone handling
CREATE TABLE announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  message text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  timezone text NOT NULL DEFAULT 'Asia/Kolkata',
  CONSTRAINT valid_dates CHECK (end_date >= start_date)
);

-- Create indexes
CREATE INDEX idx_announcements_dates ON announcements(start_date, end_date);
CREATE INDEX idx_announcements_doctor ON announcements(doctor_id);
CREATE INDEX idx_announcements_current ON announcements(start_date, end_date) 
  WHERE CURRENT_TIMESTAMP BETWEEN start_date AND end_date;

-- Enable RLS
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
CREATE POLICY "Allow all operations on announcements"
  ON announcements
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Add timezone functions
CREATE OR REPLACE FUNCTION to_ist(utc_date timestamptz) 
RETURNS timestamptz AS $$
BEGIN
  RETURN utc_date AT TIME ZONE 'Asia/Kolkata';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Add helpful comment
COMMENT ON TABLE announcements IS 'Stores doctor availability announcements with timezone support';