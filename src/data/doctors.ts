import { WeeklyAvailability } from '../types/availability';

const defaultWeeklyAvailability: WeeklyAvailability = {
  monday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '20:00' }] },
  tuesday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '20:00' }] },
  wednesday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '20:00' }] },
  thursday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '20:00' }] },
  friday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '20:00' }] },
  saturday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '20:00' }] },
  sunday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '14:00' }] }
};

export const doctors = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: "Dr. N.SWAPNA",
    specialty: "Paediatrics Specialist",
    qualification: "M.B.B.S, MD, IAP-Fellowship in Neonatology (Fernandez Hospital, Hyderabad)",
    experience: "Senior Consultant",
    image: "https://gatgyhxtgqmzwjatbmzk.supabase.co/storage/v1/object/sign/suraksha-hospital-images/Dr.Swapna.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzdXJha3NoYS1ob3NwaXRhbC1pbWFnZXMvRHIuU3dhcG5hLmpwZyIsImlhdCI6MTczNjUzMDA1NSwiZXhwIjoxNzY4MDY2MDU1fQ.WfjuiamtNXJ3i92kdg8XwlOFYtl0y4H8PxXAJpcUcB0&t=2025-01-10T17%3A27%3A35.606Z",
    availability: {
      weekly: defaultWeeklyAvailability,
      exceptions: []
    }
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: "Dr.Bysani NAVEEN KUMAR",
    specialty: "General Medicine, Physician & Diabetologist",
    qualification: "M.B.B.S., M.D General Medicine",
    experience: "Senior Consultant",
    image: "https://gatgyhxtgqmzwjatbmzk.supabase.co/storage/v1/object/sign/suraksha-hospital-images/Dr.Naveen.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzdXJha3NoYS1ob3NwaXRhbC1pbWFnZXMvRHIuTmF2ZWVuLmpwZyIsImlhdCI6MTczNjUzMDM1OSwiZXhwIjoxNzY4MDY2MzU5fQ.AHcKcI1uUKaYmmziPyeOTtEojLYi-W6jwDD5rnOZovs&t=2025-01-10T17%3A32%3A39.402Z",
    availability: {
      weekly: defaultWeeklyAvailability,
      exceptions: []
    }
  }
];