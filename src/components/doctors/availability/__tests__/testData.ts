import { WeeklyAvailability, AvailabilityException } from '../../../../types/availability';

export const mockWeeklySchedule: WeeklyAvailability = {
  monday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '15:30' }] },
  tuesday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '15:30' }] },
  wednesday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '15:30' }] },
  thursday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '15:30' }] },
  friday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '15:30' }] },
  saturday: { isAvailable: true, slots: [{ startTime: '10:00', endTime: '13:00' }] },
  sunday: { isAvailable: false, slots: [] }
};

export const mockExceptions: AvailabilityException[] = [
  {
    date: new Date().toISOString().split('T')[0], // Today
    reason: "Out for medical conference",
    type: "unavailable"
  },
  {
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    reason: "Limited availability",
    type: "custom",
    slots: [{ startTime: '14:00', endTime: '17:00' }]
  }
];