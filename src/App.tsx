import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './components/language/LanguageContext';
import { AppointmentProvider } from './context/AppointmentContext';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import { HealthToolsPage } from './components/calculators/HealthTools';
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
import LaboratoryServicesPage from './components/services/laboratory/LaboratoryServicesPage';
import LaboratoryServiceDetailPage from './components/services/laboratory/pages/ServiceDetailPage';

function App() {
  return (
    <LanguageProvider>
      <AppointmentProvider>
        <Router>
          <ScrollToTop />
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/health-tools" element={<HealthToolsPage />} />
              <Route path="/calculators/due-date" element={<DueDateCalculatorPage />} />
              <Route path="/services/emergency" element={<EmergencyServicesPage />} />
              <Route path="/services/general-healthcare" element={<GeneralHealthcarePage />} />
              <Route path="/services/general-healthcare/:categoryId" element={<CategoryDetailPage />} />
              <Route path="/services/pharmacy" element={<PharmacyServicesPage />} />
              <Route path="/services/paediatrics" element={<PaediatricsPage />} />
              <Route path="/services/paediatrics/:serviceId" element={<ServiceDetailPage />} />
              <Route path="/services/laboratory" element={<LaboratoryServicesPage />} />
              <Route path="/services/laboratory/:serviceId" element={<LaboratoryServiceDetailPage />} />
            </Routes>
          </MainLayout>
        </Router>
      </AppointmentProvider>
    </LanguageProvider>
  );
}