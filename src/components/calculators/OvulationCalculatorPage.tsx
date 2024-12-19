import React, { useState } from 'react';
import { Calendar, ArrowLeft, Heart, Clock, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addDays, subDays, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const OvulationCalculatorPage = () => {
  const navigate = useNavigate();
  const [periodDate, setPeriodDate] = useState<Date | null>(null);
  const [result, setResult] = useState<{
    ovulationDate: Date;
    fertileWindow: {
      start: Date;
      end: Date;
    };
    nextPeriod: Date;
  } | null>(null);

  const calculateOvulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!periodDate) return;

    // Calculate dates
    const ovulationDate = addDays(periodDate, 14);
    const fertileWindowStart = subDays(ovulationDate, 5);
    const fertileWindowEnd = addDays(ovulationDate, 1);
    const nextPeriod = addDays(periodDate, 28);

    setResult({
      ovulationDate,
      fertileWindow: {
        start: fertileWindowStart,
        end: fertileWindowEnd
      },
      nextPeriod
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-400 to-orange-500 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1608158432223-3c0d2f6d9e2f?q=80')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center text-white/90 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Ovulation Calculator
          </h1>
          <p className="text-xl text-amber-100 mb-8 animate-fade-in-delayed max-w-2xl">
            Track your fertility window and plan your pregnancy journey with our
            professional ovulation calculator.
          </p>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Calculator Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
            <form onSubmit={calculateOvulation} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  First Day of Last Period
                </label>
                <div className="relative">
                  <DatePicker
                    selected={periodDate}
                    onChange={(date: Date) => setPeriodDate(date)}
                    dateFormat="MMMM d, yyyy"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholderText="Select date"
                    required
                  />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none animate-pulse" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 active:scale-100 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Heart className="w-5 h-5 animate-pulse" />
                <span>Calculate Ovulation</span>
              </button>
            </form>

            {result && (
              <div className="mt-8 space-y-4 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg animate-fade-in shadow-inner">
                <div className="grid grid-cols-1 gap-4">
                  <div className="transform transition-all duration-300 hover:-translate-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Ovulation Date</h3>
                    <p className="mt-1 text-2xl font-semibold text-amber-600">
                      {format(result.ovulationDate, 'MMMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="transform transition-all duration-300 hover:-translate-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Fertile Window</h3>
                    <p className="mt-1 text-2xl font-semibold text-amber-600">
                      {format(result.fertileWindow.start, 'MMM dd')} - {format(result.fertileWindow.end, 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="transform transition-all duration-300 hover:-translate-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Next Period</h3>
                    <p className="mt-1 text-2xl font-semibold text-amber-600">
                      {format(result.nextPeriod, 'MMMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Information Panel */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Info className="w-6 h-6 mr-2 text-amber-500" />
                Understanding Ovulation
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="animate-fade-in">
                  Ovulation typically occurs around day 14 of your menstrual cycle,
                  counting from the first day of your last period.
                </p>
                <p className="animate-fade-in delay-100">
                  Your fertile window includes the 5 days before ovulation and the
                  day of ovulation itself, as sperm can survive in the body for
                  several days.
                </p>
                <p className="animate-fade-in delay-200">
                  This calculator provides estimates based on a typical 28-day cycle.
                  For more accurate predictions, consult with our healthcare professionals.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-amber-500" />
                Cycle Timeline
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 transform transition-all duration-300 hover:-translate-y-1">
                  <div className="w-24 font-semibold text-amber-500">Days 1-5</div>
                  <div className="flex-1 text-gray-600">Menstruation phase</div>
                </div>
                <div className="flex items-start space-x-3 transform transition-all duration-300 hover:-translate-y-1">
                  <div className="w-24 font-semibold text-amber-500">Days 10-14</div>
                  <div className="flex-1 text-gray-600">Fertile window begins</div>
                </div>
                <div className="flex items-start space-x-3 transform transition-all duration-300 hover:-translate-y-1">
                  <div className="w-24 font-semibold text-amber-500">Day 14</div>
                  <div className="flex-1 text-gray-600">Typical ovulation day</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OvulationCalculatorPage;