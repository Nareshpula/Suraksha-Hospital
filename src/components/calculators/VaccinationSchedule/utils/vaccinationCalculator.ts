import { addDays, addMonths, addWeeks } from 'date-fns';
import { VaccinationScheduleType } from '../types';

export const calculateVaccinations = (birthDate: Date): VaccinationScheduleType[] => {
  return [
    {
      vaccine: "BCG, OPV-0, Hepatitis B-1",
      description: "First dose at birth",
      dueDate: birthDate,
      status: "due"
    },
    {
      vaccine: "DTwP-1, IPV-1, Hepatitis B-2, Hib-1, Rotavirus-1, PCV-1",
      description: "First set of primary vaccinations",
      dueDate: addWeeks(birthDate, 6),
      status: "upcoming"
    },
    {
      vaccine: "DTwP-2, IPV-2, Hib-2, Rotavirus-2, PCV-2",
      description: "Second set of primary vaccinations",
      dueDate: addWeeks(birthDate, 10),
      status: "upcoming"
    },
    {
      vaccine: "DTwP-3, IPV-3, Hepatitis B-3, Hib-3, Rotavirus-3, PCV-3",
      description: "Third set of primary vaccinations",
      dueDate: addWeeks(birthDate, 14),
      status: "upcoming"
    },
    {
      vaccine: "Measles-1, OPV-2",
      description: "First measles dose and OPV booster",
      dueDate: addMonths(birthDate, 9),
      status: "upcoming"
    },
    {
      vaccine: "MMR-1, Varicella-1, PCV Booster",
      description: "MMR and Chickenpox vaccines",
      dueDate: addMonths(birthDate, 12),
      status: "upcoming"
    },
    {
      vaccine: "DTwP Booster-1, IPV Booster-1, Hib Booster",
      description: "First set of booster doses",
      dueDate: addMonths(birthDate, 16),
      status: "upcoming"
    }
  ];
};