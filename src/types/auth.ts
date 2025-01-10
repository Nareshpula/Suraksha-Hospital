export type StaffRole = 'admin' | 'doctor' | 'receptionist';

export interface StaffUser {
  id: string;
  username: string;
  role: StaffRole;
}