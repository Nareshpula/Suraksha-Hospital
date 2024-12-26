import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './components/language/LanguageContext';
import { AppointmentProvider } from './context/AppointmentContext';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import AppointmentPage from './components/appointments/AppointmentPage';
import BookAppointmentPage from './components/appointments/BookAppointmentPage';
import HealthTools from './components/calculators/HealthTools';
import BMICalculatorPage from './components/calculators/BMICalculator/BMICalculatorPage';
import VaccinationSchedulePage from './components/calculators/VaccinationSchedule/VaccinationSchedulePage';
import {
  HomePage,
  AboutUsPage,
  DueDateCalculatorPage,
  EmergencyServicesPage,
  GeneralHealthcarePage,
  PharmacyServicesPage
} from './pages';
import ServiceDetailPage from './components/services/paediatrics/pages/ServiceDetailPage';
import PaediatricsPage from './components/services/paediatrics/PaediatricsPage';
import CategoryDetailPage from './components/services/general/CategoryDetailPage';
import FeverTreatmentPage from './components/services/fever/FeverTreatmentPage';
import LaboratoryServicesPage from './components/services/laboratory/LaboratoryServicesPage';
import LaboratoryServiceDetailPage from './components/services/laboratory/pages/ServiceDetailPage';

function App() {
  return (
    <LanguageProvider>
      <AppointmentProvider>
        <ScrollToTop />
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="appointments">
              <Route index element={<AppointmentPage />} />
              <Route path="book/:doctorId" element={<BookAppointmentPage />} />
            </Route>
            <Route path="/health-tools" element={<HealthTools />} />
            <Route path="/calculators/bmi" element={<BMICalculatorPage />} />
            <Route path="/calculators/vaccination" element={<VaccinationSchedulePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/calculators/due-date" element={<DueDateCalculatorPage />} />
            <Route path="/services/emergency" element={<EmergencyServicesPage />} />
            <Route path="/services/general-healthcare" element={<GeneralHealthcarePage />} />
            <Route path="/services/general-healthcare/:categoryId" element={<CategoryDetailPage />} />
            <Route path="/services/pharmacy" element={<PharmacyServicesPage />} />
            <Route path="/services/paediatrics" element={<PaediatricsPage />} />
            <Route path="/services/fever-treatment" element={<FeverTreatmentPage />} />
            <Route path="/services/paediatrics/:serviceId" element={<ServiceDetailPage />} />
            <Route path="/services/laboratory" element={<LaboratoryServicesPage />} />
            <Route path="/services/laboratory/:serviceId" element={<LaboratoryServiceDetailPage />} />
          </Routes>
        </MainLayout>
      </AppointmentProvider>
    </LanguageProvider>
  );
}

export default App;