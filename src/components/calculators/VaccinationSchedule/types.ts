export interface VaccinationScheduleType {
  vaccine: string;
  description: string;
  dueDate: Date;
  status: 'due' | 'upcoming' | 'completed';
}