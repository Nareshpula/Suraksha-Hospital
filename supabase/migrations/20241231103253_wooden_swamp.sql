/*
  # Add Test Staff Users
  
  1. New Users Added
    - Admin user for system management
    - Doctor accounts for Dr. N.SWAPNA and Dr. Bysani NAVEEN KUMAR
    - Receptionist account for front desk
    
  2. Security
    - Passwords are properly hashed using pgcrypto
    - Each user has appropriate role assignment
    
  Note: These are test accounts - in production, proper user management procedures should be followed
*/

-- Insert test users with hashed passwords
INSERT INTO staff_users (username, password_hash, role)
VALUES
  -- Admin user (password: admin123)
  ('admin', crypt('admin123', gen_salt('bf')), 'admin'),
  
  -- Doctor accounts
  -- Dr. N.SWAPNA (password: swapna123)
  ('dr.swapna', crypt('swapna123', gen_salt('bf')), 'doctor'),
  
  -- Dr. Bysani NAVEEN KUMAR (password: naveen123)
  ('dr.naveen', crypt('naveen123', gen_salt('bf')), 'doctor'),
  
  -- Receptionist (password: reception123)
  ('reception', crypt('reception123', gen_salt('bf')), 'receptionist')
ON CONFLICT (username) DO NOTHING;