import React, { useState } from 'react';
import { Search, User, Phone } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AppointmentList from './AppointmentList';
import { Alert } from '../common/Alert';

interface SearchResult {
  id: string;
  doctor_id: string;
  patient_name: string;
  phone_number: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  doctor?: {
    name: string;
  };
}

const AppointmentSearch = () => {
  const [phone_number, setPhoneNumber] = useState('');
  const [patient_name, setPatientName] = useState('');
  const [appointments, setAppointments] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setHasSearched(true);
    setAppointments([]);

    if (!phone_number && !patient_name) {
      setError('Please enter a phone number or patient name');
      return;
    }

    // Debug input values
    console.log('Raw input:', {
      phone_number,
      patient_name
    });

    try {
      setIsLoading(true);
      // Clean input values
      const cleanPhone = phone_number.trim();
      const cleanName = patient_name.trim();

      // Debug cleaned values
      console.log('Cleaned values:', {
        phone_number: cleanPhone,
        patient_name: cleanName
      });

      // Build base query
      let query = supabase
        .from('appointments')
        .select(`
          *,
          doctor:doctors(name)
        `);

      // Add filters
      if (cleanPhone) {
        // Exact match for phone number
        query = query.eq('phone_number', cleanPhone.replace(/['"]/g, ''));
      }

      if (cleanName) {
        // Case-insensitive match for patient name
        query = query.ilike('patient_name', `%${cleanName.replace(/['"]/g, '')}%`);
      }

      // Add ordering
      query = query
        .order('appointment_date', { ascending: false })
        .order('appointment_time', { ascending: true });

      // Execute query
      console.log('Executing search with criteria:', {
        phone_number: cleanPhone || null,
        patient_name: cleanName || null
      });

      const { data, error: searchError } = await query;

      // Debug results
      console.log('Raw results:', {
        count: data?.length || 0,
        data: JSON.stringify(data, null, 2),
        error: searchError
      });

      if (searchError) throw searchError;

      // Transform and validate results
      const validAppointments = (data || []).map((apt) => ({
        ...apt,
        patient_name: apt.patient_name || '',
        phone_number: apt.phone_number || '',
        doctor: apt.doctor || { id: null, name: 'Unknown Doctor' },
        appointment_date: apt.appointment_date || 'Invalid Date',
        appointment_time: apt.appointment_time || 'Invalid Time',
        status: apt.status || 'pending'
      }));

      setAppointments(validAppointments);

      if (validAppointments.length === 0) {
        setError('No appointments found matching your search criteria');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to search appointments'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Search Appointments
            </h2>
            <p className="text-gray-600">
              Search for appointments by phone number or patient name
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            {error && (
              <Alert
                type="error"
                message={error}
                onClose={() => setError(null)}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="tel"
                    value={phone_number}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/\D/g, ''))
                    }
                    className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/50"
                    placeholder="Enter phone number"
                    pattern="[0-9]*"
                    maxLength={10}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={patient_name}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white/50"
                    placeholder="Enter patient name"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Search className="w-5 h-5" />
                <span>{isLoading ? 'Searching...' : 'Search'}</span>
              </button>
            </div>
          </form>

          {hasSearched && (
            <div className="mt-8">
              {appointments.length > 0 ? (
                <AppointmentList appointments={appointments} />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No appointments found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentSearch;