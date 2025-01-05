import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './components/auth/LoginPage';
import { LanguageProvider } from './components/language/LanguageContext';
import { AppointmentProvider } from './context/AppointmentContext';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import AppointmentPage from './components/appointments/AppointmentPage';
import BookAppointmentPage from './components/appointments/BookAppointmentPage';
import AppointmentSearch from './components/appointments/AppointmentSearch';
import AppointmentSuccess from './components/appointments/AppointmentSuccess';
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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect from LastPage if not coming from login
    if (location.pathname === '/last' && !location.state?.isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  return (
    <AuthProvider>
      <LanguageProvider>
        <AppointmentProvider>
          <ScrollToTop />
          <MainLayout>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="appointments">
              <Route index element={<AppointmentPage />} />
              <Route path="book/:doctorId" element={<BookAppointmentPage />} />
              <Route path="search" element={
                <ProtectedRoute allowedRoles={['admin', 'doctor', 'receptionist']}>
                  <AppointmentSearch />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                {/* Admin routes will go here */}
              </ProtectedRoute>
            } />
            <Route path="/doctor/*" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                {/* Doctor routes will go here */}
              </ProtectedRoute>
            } />
            <Route path="/reception/*" element={
              <ProtectedRoute allowedRoles={['receptionist']}>
                {/* Receptionist routes will go here */}
              </ProtectedRoute>
            } />
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
            <Route path="/appointment-success" element={<AppointmentSuccess />} />
          </Routes>
        </MainLayout>
      </AppointmentProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;