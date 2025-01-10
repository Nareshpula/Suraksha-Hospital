-- Update doctor availability to include evening slots
UPDATE doctors
SET availability = jsonb_build_object(
  'weekly', jsonb_build_object(
    'monday', jsonb_build_object(
      'isAvailable', true,
      'slots', jsonb_build_array(
        jsonb_build_object('startTime', '10:00', 'endTime', '15:30'),
        jsonb_build_object('startTime', '18:00', 'endTime', '20:00')
      )
    ),
    'tuesday', jsonb_build_object(
      'isAvailable', true,
      'slots', jsonb_build_array(
        jsonb_build_object('startTime', '10:00', 'endTime', '15:30'),
        jsonb_build_object('startTime', '18:00', 'endTime', '20:00')
      )
    ),
    'wednesday', jsonb_build_object(
      'isAvailable', true,
      'slots', jsonb_build_array(
        jsonb_build_object('startTime', '10:00', 'endTime', '15:30'),
        jsonb_build_object('startTime', '18:00', 'endTime', '20:00')
      )
    ),
    'thursday', jsonb_build_object(
      'isAvailable', true,
      'slots', jsonb_build_array(
        jsonb_build_object('startTime', '10:00', 'endTime', '15:30'),
        jsonb_build_object('startTime', '18:00', 'endTime', '20:00')
      )
    ),
    'friday', jsonb_build_object(
      'isAvailable', true,
      'slots', jsonb_build_array(
        jsonb_build_object('startTime', '10:00', 'endTime', '15:30'),
        jsonb_build_object('startTime', '18:00', 'endTime', '20:00')
      )
    ),
    'saturday', jsonb_build_object(
      'isAvailable', true,
      'slots', jsonb_build_array(
        jsonb_build_object('startTime', '10:00', 'endTime', '13:00'),
        jsonb_build_object('startTime', '18:00', 'endTime', '20:00')
      )
    ),
    'sunday', jsonb_build_object(
      'isAvailable', true,
      'slots', jsonb_build_array(
        jsonb_build_object('startTime', '10:00', 'endTime', '14:00')
      )
    )
  ),
  'exceptions', '[]'::jsonb
);