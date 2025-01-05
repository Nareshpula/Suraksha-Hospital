export const DAYS_MAP = {
  0: 'sunday',
  1: 'monday', 
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday'
} as const;

export const DEFAULT_WEEKLY_AVAILABILITY = {
  monday: { isAvailable: true, slots: [
    { startTime: '10:00', endTime: '15:30' },
    { startTime: '18:00', endTime: '20:00' }
  ]},
  tuesday: { isAvailable: true, slots: [
    { startTime: '10:00', endTime: '15:30' },
    { startTime: '18:00', endTime: '20:00' }
  ]},
  wednesday: { isAvailable: true, slots: [
    { startTime: '10:00', endTime: '15:30' },
    { startTime: '18:00', endTime: '20:00' }
  ]},
  thursday: { isAvailable: true, slots: [
    { startTime: '10:00', endTime: '15:30' },
    { startTime: '18:00', endTime: '20:00' }
  ]},
  friday: { isAvailable: true, slots: [
    { startTime: '10:00', endTime: '15:30' },
    { startTime: '18:00', endTime: '20:00' }
  ]},
  saturday: { isAvailable: true, slots: [
    { startTime: '10:00', endTime: '13:00' },
    { startTime: '18:00', endTime: '20:00' }
  ]},
  sunday: { isAvailable: true, slots: [
    { startTime: '10:00', endTime: '14:00' },    
  ]}
};