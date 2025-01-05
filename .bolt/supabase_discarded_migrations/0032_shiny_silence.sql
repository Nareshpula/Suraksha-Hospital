-- Add availability column to doctors table
ALTER TABLE doctors
ADD COLUMN IF NOT EXISTS availability jsonb DEFAULT jsonb_build_object(
  'weekly', jsonb_build_object(
    'monday', jsonb_build_object('isAvailable', true, 'slots', jsonb_build_array(
      jsonb_build_object('startTime', '09:00', 'endTime', '17:00')
    )),
    'tuesday', jsonb_build_object('isAvailable', true, 'slots', jsonb_build_array(
      jsonb_build_object('startTime', '09:00', 'endTime', '17:00')
    )),
    'wednesday', jsonb_build_object('isAvailable', true, 'slots', jsonb_build_array(
      jsonb_build_object('startTime', '09:00', 'endTime', '17:00')
    )),
    'thursday', jsonb_build_object('isAvailable', true, 'slots', jsonb_build_array(
      jsonb_build_object('startTime', '09:00', 'endTime', '17:00')
    )),
    'friday', jsonb_build_object('isAvailable', true, 'slots', jsonb_build_array(
      jsonb_build_object('startTime', '09:00', 'endTime', '17:00')
    )),
    'saturday', jsonb_build_object('isAvailable', true, 'slots', jsonb_build_array(
      jsonb_build_object('startTime', '09:00', 'endTime', '13:00')
    )),
    'sunday', jsonb_build_object('isAvailable', false, 'slots', jsonb_build_array())
  ),
  'exceptions', jsonb_build_array()
);