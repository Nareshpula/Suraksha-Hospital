/*
  # Add Dr. Naveen Kumar data

  1. Changes
    - Ensures Dr. Naveen Kumar's data is properly inserted
    - Updates image URL and availability settings
*/

-- Ensure Dr. Naveen Kumar's data is properly inserted
INSERT INTO doctors (
  id,
  name,
  specialty,
  qualification,
  experience,
  image_url,
  availability
)
VALUES (
  '123e4567-e89b-12d3-a456-426614174001',
  'Dr.Bysani NAVEEN KUMAR',
  'General Medicine, Physician & Diabetologist',
  'M.B.B.S., M.D General Medicine',
  'Senior Consultant',
  'https://lqfwqgmcceameepaaces.supabase.co/storage/v1/object/public/suraksha-hospital-images/Dr.BysaniNAVEENKUMAR.jpg?t=2024-03-20T10:00:00.000Z',
  jsonb_build_object(
    'weekly', jsonb_build_object(
      'monday', jsonb_build_object('isAvailable', true, 'slots', ARRAY[jsonb_build_object('startTime', '10:00', 'endTime', '15:30')]),
      'tuesday', jsonb_build_object('isAvailable', true, 'slots', ARRAY[jsonb_build_object('startTime', '10:00', 'endTime', '15:30')]),
      'wednesday', jsonb_build_object('isAvailable', true, 'slots', ARRAY[jsonb_build_object('startTime', '10:00', 'endTime', '15:30')]),
      'thursday', jsonb_build_object('isAvailable', true, 'slots', ARRAY[jsonb_build_object('startTime', '10:00', 'endTime', '15:30')]),
      'friday', jsonb_build_object('isAvailable', true, 'slots', ARRAY[jsonb_build_object('startTime', '10:00', 'endTime', '15:30')]),
      'saturday', jsonb_build_object('isAvailable', true, 'slots', ARRAY[jsonb_build_object('startTime', '10:00', 'endTime', '13:00')]),
      'sunday', jsonb_build_object('isAvailable', false, 'slots', '[]'::jsonb)
    ),
    'exceptions', '[]'::jsonb
  )
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  specialty = EXCLUDED.specialty,
  qualification = EXCLUDED.qualification,
  experience = EXCLUDED.experience,
  image_url = EXCLUDED.image_url,
  availability = EXCLUDED.availability;