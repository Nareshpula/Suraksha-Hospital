import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { doctors } from '../../data/doctors';
import BookingForm from './BookingForm';
import { Alert } from '../common/Alert';
import { useEffect, useState } from 'react';
import { normalizeUUID } from '../../utils/doctorValidation';

const BookAppointmentPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<any>(null);
  
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        if (!doctorId) {
          throw new Error('Invalid doctor ID');
        }

        // First check local data
        const localDoctor = doctors.find(d => normalizeUUID(d.id) === normalizeUUID(doctorId));
        if (localDoctor) {
          setDoctor(localDoctor);
          return;
        }
        
        // Then try database
        const { data, error } = await supabase
          .from('doctors')
          .select('*')
          .eq('id', normalizeUUID(doctorId))
          .single();

        if (error) {
          console.error('Database error:', error);
          throw new Error('Selected doctor is not available');
        }

        setDoctor(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Selected doctor is not available';
        navigate('/appointments', { 
          state: { error: message },
          replace: true 
        });
      }
    };

    fetchDoctor();
  }, [doctorId, navigate]);

  if (!doctor) return null;

  const handleSuccess = () => {
    navigate('/', { 
      state: { 
        success: 'Appointment booked successfully! We will contact you shortly.' 
      }
    });
  };

  const handleCancel = () => {
    navigate('/appointments');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 pt-16">
      {error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <Alert 
            type="error"
            message={error}
            onClose={() => setError(null)}
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={() => navigate('/appointments')}
          className="group flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Doctor Selection
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Book Appointment with {doctor.name}</h2>
            <p className="text-gray-600 mt-2">{doctor.specialty}</p>
          </div>

          <BookingForm 
            doctorId={doctorId}
            doctor={doctor}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;