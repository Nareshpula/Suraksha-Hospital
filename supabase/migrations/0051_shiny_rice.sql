-- Drop existing announcements table
DROP TABLE IF EXISTS announcements;

-- Create announcements table with proper structure
CREATE TABLE announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid NOT NULL,
  message text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (end_date >= start_date),
  CONSTRAINT fk_doctor FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

-- Create indexes for performance
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

-- Add helpful comment
COMMENT ON TABLE announcements IS 'Stores doctor availability announcements';

-- Insert initial doctors if they don't exist
INSERT INTO doctors (id, name, specialty, qualification, experience, image_url)
SELECT 
  '123e4567-e89b-12d3-a456-426614174000'::uuid,
  'Dr. N.SWAPNA',
  'Paediatrics Specialist',
  'M.B.B.S, MD, IAP-Fellowship in Neonatology (Fernandez Hospital, Hyderabad)',
  'Senior Consultant',
  'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg'
WHERE NOT EXISTS (
  SELECT 1 FROM doctors WHERE id = '123e4567-e89b-12d3-a456-426614174000'::uuid
);

INSERT INTO doctors (id, name, specialty, qualification, experience, image_url)
SELECT 
  '123e4567-e89b-12d3-a456-426614174001'::uuid,
  'Dr.Bysani NAVEEN KUMAR',
  'General Medicine, Physician & Diabetologist',
  'M.B.B.S., M.D General Medicine',
  'Senior Consultant',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d'
WHERE NOT EXISTS (
  SELECT 1 FROM doctors WHERE id = '123e4567-e89b-12d3-a456-426614174001'::uuid
);