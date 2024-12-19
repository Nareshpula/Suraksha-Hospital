import React from 'react';
import { RouteObject } from 'react-router-dom';
import { HealthToolsPage } from '../components/calculators/HealthTools';
import BMICalculatorPage from '../components/calculators/BMICalculator/BMICalculatorPage';
import DueDateCalculatorPage from '../components/calculators/DueDateCalculatorPage';
import VaccinationSchedulePage from '../components/calculators/VaccinationSchedule/VaccinationSchedulePage';

export const healthToolsRoutes: RouteObject[] = [
  {
    path: '/health-tools',
    element: <HealthToolsPage />
  },
  {
    path: '/calculators/bmi',
    element: <BMICalculatorPage />
  },
  {
    path: '/calculators/due-date',
    element: <DueDateCalculatorPage />
  },
  {
    path: '/calculators/vaccination',
    element: <VaccinationSchedulePage />
  }
];