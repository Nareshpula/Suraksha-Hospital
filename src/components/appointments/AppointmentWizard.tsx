import React, { useState } from 'react';
import DoctorSelection from './DoctorSelection';
import AppointmentForm from './AppointmentForm';
import OTPVerification from './OTPVerification';
import ConfirmationPage from './ConfirmationPage';
import { Doctor } from '../../types/doctor';
import { AppointmentFormData } from '../../types/appointment';

type WizardStep = 'doctor-selection' | 'appointment-form' | 'otp-verification' | 'confirmation';

const AppointmentWizard = () => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('doctor-selection');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointmentData, setAppointmentData] = useState<AppointmentFormData | null>(null);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep('appointment-form');
  };

  const handleFormSubmit = (data: AppointmentFormData) => {
    setAppointmentData(data);
    setCurrentStep('otp-verification');
  };

  const handleOTPVerified = () => {
    setCurrentStep('confirmation');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'doctor-selection':
        return <DoctorSelection onDoctorSelect={handleDoctorSelect} />;
      case 'appointment-form':
        return selectedDoctor && (
          <AppointmentForm 
            doctor={selectedDoctor} 
            onSubmit={handleFormSubmit}
            onBack={() => setCurrentStep('doctor-selection')}
          />
        );
      case 'otp-verification':
        return appointmentData && (
          <OTPVerification 
            phoneNumber={appointmentData.phone}
            onVerified={handleOTPVerified}
            onBack={() => setCurrentStep('appointment-form')}
          />
        );
      case 'confirmation':
        return appointmentData && selectedDoctor && (
          <ConfirmationPage 
            doctor={selectedDoctor}
            appointment={appointmentData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderStep()}
      </div>
    </div>
  );
};

export default AppointmentWizard;