import { WeeklyAvailability } from '../types/availability';

const defaultWeeklyAvailability: WeeklyAvailability = {
  monday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '15:30' }] },
  tuesday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '15:30' }] },
  wednesday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '15:30' }] },
  thursday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '15:30' }] },
  friday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '15:30' }] },
  saturday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '13:00' }] },
  sunday: { isAvailable: false, slots: [] }
};

export const doctors = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: "Dr. N.SWAPNA",
    specialty: "Paediatrics Specialist",
    qualification: "M.B.B.S, MD, IAP-Fellowship in Neonatology (Fernandez Hospital, Hyderabad)",
    experience: "Senior Consultant",
    image: "https://lqfwqgmcceameepaaces.supabase.co/storage/v1/object/public/suraksha-hospital-images/Dr.N.SWAPNA.jpg",
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
    image: "https://lqfwqgmcceameepaaces.supabase.co/storage/v1/object/public/suraksha-hospital-images/Dr.BysaniNAVEENKUMAR.jpg",
    availability: {
      weekly: defaultWeeklyAvailability,
      exceptions: []
    }
  }
];