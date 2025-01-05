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
    image: "https://images.pexels.com/photos/5452221/pexels-photo-5452221.jpeg",
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
    image: "https://images.pexels.com/photos/5452221/pexels-photo-5452221.jpeg",
    availability: {
      weekly: defaultWeeklyAvailability,
      exceptions: []
    }
  }
];