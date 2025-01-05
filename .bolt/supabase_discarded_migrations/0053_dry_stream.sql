-- First ensure doctors exist with proper UUIDs
INSERT INTO doctors (id, name, specialty, qualification, experience, image_url)
VALUES 
  (
    '123e4567-e89b-12d3-a456-426614174000'::uuid,
    'Dr. N.SWAPNA',
    'Paediatrics Specialist',
    'M.B.B.S, MD, IAP-Fellowship in Neonatology (Fernandez Hospital, Hyderabad)',
    'Senior Consultant',
    'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg'
  ),
  (
    '123e4567-e89b-12d3-a456-426614174001'::uuid,
    'Dr.Bysani NAVEEN KUMAR',
    'General Medicine, Physician & Diabetologist',
    'M.B.B.S., M.D General Medicine',
    'Senior Consultant',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d'
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  specialty = EXCLUDED.specialty,
  qualification = EXCLUDED.qualification,
  experience = EXCLUDED.experience,
  image_url = EXCLUDED.image_url;

-- Update doctors' availability
UPDATE doctors
SET availability = jsonb_build_object(
  'weekly', jsonb_build_object(
    'monday', jsonb_build_object('isAvailable', true, 'slots', jsonb_build_array(
      jsonb_build_object('startTime', '10:00', 'endTime', '15:30')
    )),
    'tuesday', jsonb_build_object('isAvailable', true, 'slots', jsonb_build_array(
      jsonb_build_object('startTime', '10:00', 'endTime', '15:30')
    )),
    'wednesday', jsonb_build_object('isAvailable', true, 'slots', jsonb_build_array(
      jsonb_build_object('startTime', '10:00', 'endTime', '15:30')
    )),
    'thursday', jsonb_build_object('isAvailable', true, 'slots', jsonb_build_array(
      jsonb_build_object('startTime', '10:00', 'endTime', '15:30')
    )),
    'friday', jsonb_build_object('isAvailable', true, 'slots', jsonb_build_array(
      jsonb_build_object('startTime', '10:00', 'endTime', '15:30')
    )),
    'saturday', jsonb_build_object('isAvailable', true, 'slots', jsonb_build_array(
      jsonb_build_object('startTime', '10:00', 'endTime', '13:00')
    )),
    'sunday', jsonb_build_object('isAvailable', false, 'slots', jsonb_build_array())
  ),
  'exceptions', jsonb_build_array()
)
WHERE id IN ('123e4567-e89b-12d3-a456-426614174000'::uuid, '123e4567-e89b-12d3-a456-426614174001'::uuid);

-- Recreate announcements table
DROP TABLE IF EXISTS announcements;

CREATE TABLE announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid NOT NULL,
  message text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  is_current boolean, -- regular column for current status
  CONSTRAINT valid_dates CHECK (end_date >= start_date),
  CONSTRAINT fk_doctor FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

-- Create indexes
CREATE INDEX idx_announcements_dates ON announcements(start_date, end_date);
CREATE INDEX idx_announcements_doctor ON announcements(doctor_id);
CREATE INDEX idx_announcements_current ON announcements(is_current);

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
COMMENT ON TABLE announcements IS 'Stores doctor availability announcements with automatic cleanup';

-- Trigger to update `is_current` field
CREATE OR REPLACE FUNCTION update_is_current() RETURNS trigger AS $$ 
BEGIN
  NEW.is_current := CURRENT_TIMESTAMP BETWEEN NEW.start_date AND NEW.end_date;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_is_current_trigger
  BEFORE INSERT OR UPDATE ON announcements
  FOR EACH ROW
  EXECUTE FUNCTION update_is_current();