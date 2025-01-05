-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public to view doctors" ON doctors;
DROP POLICY IF EXISTS "Allow public to create appointments" ON appointments;
DROP POLICY IF EXISTS "Allow users to view own appointments" ON appointments;

-- Create essential tables
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialty text NOT NULL,
  qualification text NOT NULL,
  experience text,
  availability jsonb,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid NOT NULL REFERENCES doctors(id),
  patient_name text NOT NULL,
  phone_number text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT valid_phone CHECK (phone_number ~ '^[6-9]\d{9}$'),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'cancelled'))
);

-- Enable RLS
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public to view doctors"
  ON doctors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public to create appointments"
  ON appointments FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow users to view own appointments"
  ON appointments FOR SELECT
  TO public
  USING (phone_number = current_user);

-- Insert initial doctors
INSERT INTO doctors (name, specialty, qualification, experience)
VALUES
  ('Dr. N.SWAPNA', 'Paediatrics', 'M.B.B.S, MD, IAP-Fellowship in Neonatology', 'Senior Consultant'),
  ('Dr.Bysani NAVEEN KUMAR', 'General Medicine', 'M.B.B.S., M.D General Medicine', 'Senior Consultant')
ON CONFLICT DO NOTHING;