import React, { useState } from 'react';
import { Calendar, ArrowLeft, Baby, Clock, Info } from 'lucide-react';
import { addDays, format, differenceInWeeks, differenceInDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import BackToToolsButton from '../common/BackToToolsButton';

const DueDateCalculatorPage = () => {
  const [lmpDate, setLmpDate] = useState<Date | null>(null);
  const [result, setResult] = useState<{
    dueDate: Date;
    weeksPregnant: number;
    daysPregnant: number;
    trimester: string;
  } | null>(null);

  const calculateDueDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lmpDate) return;
    
    const dueDate = addDays(lmpDate, 280);
    const today = new Date();
    
    const totalDays = differenceInDays(today, lmpDate);
    const weeksPregnant = Math.floor(totalDays / 7);
    const daysPregnant = totalDays % 7;
    
    let trimester;
    if (weeksPregnant < 13) trimester = 'First Trimester';
    else if (weeksPregnant < 27) trimester = 'Second Trimester';
    else trimester = 'Third Trimester';

    setResult({ dueDate, weeksPregnant, daysPregnant, trimester });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-rose-400 to-pink-500 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611302457661-d24c21494f2a')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackToToolsButton className="mb-8" />
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 animate-fade-in">
            Due Date Calculator
          </h1>
          <p className="text-xl text-rose-100 mb-8 animate-fade-in-delayed max-w-2xl mx-auto text-center">
            Calculate your expected due date and track your pregnancy journey with our
            professional due date calculator.
          </p>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Calculator Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
            <form onSubmit={calculateDueDate} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  First Day of Last Menstrual Period
                </label>
                <div className="relative">
                  <DatePicker
                    selected={lmpDate}
                    onChange={(date: Date) => setLmpDate(date)}
                    dateFormat="MMMM d, yyyy"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholderText="Select date"
                    required
                  />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 active:scale-100 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Baby className="w-5 h-5 animate-bounce" />
                <span>Calculate Due Date</span>
              </button>
            </form>

            {result && (
              <div className="mt-8 space-y-4 p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg animate-fade-in shadow-inner">
                <div className="grid grid-cols-1 gap-4">
                  <div className="transform transition-all duration-300 hover:-translate-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Estimated Due Date</h3>
                    <p className="mt-1 text-2xl font-semibold text-rose-600">
                      {format(result.dueDate, 'MMMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="transform transition-all duration-300 hover:-translate-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Current Progress</h3>
                    <p className="mt-1 text-2xl font-semibold text-rose-600">
                      {result.weeksPregnant} weeks and {result.daysPregnant} days
                    </p>
                  </div>
                  <div className="transform transition-all duration-300 hover:-translate-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Trimester</h3>
                    <p className="mt-1 text-2xl font-semibold text-rose-600">
                      {result.trimester}
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
                <Info className="w-6 h-6 mr-2 text-rose-500" />
                Important Information
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="animate-fade-in">
                  The due date calculator uses the first day of your last menstrual period
                  to estimate your due date. This calculation assumes a regular 28-day cycle.
                </p>
                <p className="animate-fade-in delay-100">
                  Please note that only about 5% of babies are born on their exact due date.
                  A normal pregnancy can range from 37 to 42 weeks.
                </p>
                <p className="animate-fade-in delay-200">
                  This calculator provides an estimate. For a more accurate due date,
                  consult with our healthcare professionals.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-rose-500" />
                Pregnancy Timeline
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 transform transition-all duration-300 hover:-translate-y-1">
                  <div className="w-24 font-semibold text-rose-500">Weeks 1-12</div>
                  <div className="flex-1 text-gray-600">First Trimester - Early development and formation of major organs</div>
                </div>
                <div className="flex items-start space-x-3 transform transition-all duration-300 hover:-translate-y-1">
                  <div className="w-24 font-semibold text-rose-500">Weeks 13-27</div>
                  <div className="flex-1 text-gray-600">Second Trimester - Rapid growth and movement begins</div>
                </div>
                <div className="flex items-start space-x-3 transform transition-all duration-300 hover:-translate-y-1">
                  <div className="w-24 font-semibold text-rose-500">Weeks 28-40</div>
                  <div className="flex-1 text-gray-600">Third Trimester - Final growth and preparation for birth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueDateCalculatorPage;