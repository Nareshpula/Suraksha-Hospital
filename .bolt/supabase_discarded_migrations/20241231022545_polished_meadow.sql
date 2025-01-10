/*
  # Add Initial Staff Users
  
  1. New Users
    - Admin user
    - Doctor accounts
    - Receptionist account
  
  2. Security
    - Passwords are hashed using pgcrypto
    - Each user has a specific role
*/

-- Enable pgcrypto extension if not enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert admin user
INSERT INTO staff_users (username, password_hash, role)
VALUES (
  'admin',
  crypt('Admin@BSH2024', gen_salt('bf')),
  'admin'
);

-- Insert doctor users
INSERT INTO staff_users (username, password_hash, role)
VALUES 
  (
    'dr.swapna',
    crypt('DrSwapna@BSH2024', gen_salt('bf')),
    'doctor'
  ),
  (
    'dr.naveen',
    crypt('DrNaveen@BSH2024', gen_salt('bf')),
    'doctor'
  );

-- Insert receptionist user
INSERT INTO staff_users (username, password_hash, role)
VALUES (
  'reception',
  crypt('Reception@BSH2024', gen_salt('bf')),
  'receptionist'
);