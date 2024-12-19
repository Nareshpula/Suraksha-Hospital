import React, { useState } from 'react';
import { Baby, Calendar } from 'lucide-react';
import { calculateVaccinations } from '../utils/vaccinationCalculator';
import VaccinationResults from './VaccinationResults';
import DatePicker from './DatePicker';

const VaccinationForm = () => {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [results, setResults] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate) {
      const schedule = calculateVaccinations(birthDate);
      setResults(schedule);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-rose-100 rounded-lg">
          <Baby className="w-6 h-6 text-rose-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Calculate Schedule</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Child's Date of Birth
          </label>
          <DatePicker
            selectedDate={birthDate}
            onChange={(date) => setBirthDate(date)}
            maxDate={new Date()}
          />
        </div>

        <button
          type="submit"
          disabled={!birthDate}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-lg 
                   hover:from-rose-600 hover:to-pink-700 transition-all duration-300 transform 
                   hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 
                   shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Calendar className="w-5 h-5" />
          <span>Calculate Schedule</span>
        </button>
      </form>

      {results && <VaccinationResults schedule={results} />}
    </div>
  );
};

export default VaccinationForm;