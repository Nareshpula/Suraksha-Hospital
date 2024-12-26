export interface AppointmentFormData {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  doctorId: string;
}

export interface Appointment extends AppointmentFormData {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  verified: boolean;
  createdAt: string;
}