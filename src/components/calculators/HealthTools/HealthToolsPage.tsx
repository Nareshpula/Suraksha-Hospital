import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Scale, Syringe } from 'lucide-react';

const HealthToolsPage = () => {
  const navigate = useNavigate();

  const tools = [
    {
      icon: Calendar,
      title: 'Due Date Calculator',
      description: 'Calculate your expected delivery date and track pregnancy milestones',
      path: '/calculators/due-date',
      gradient: 'from-pink-600'
    },
    {
      icon: Scale,
      title: 'BMI Calculator',
      description: 'Calculate and track your Body Mass Index for better health monitoring',
      path: '/calculators/bmi',
      gradient: 'from-emerald-600'
    },
    {
      icon: Syringe,
      title: 'Vaccination Schedule',
      description: 'Keep track of your child\'s immunization schedule and upcoming vaccinations',
      path: '/calculators/vaccination',
      gradient: 'from-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-violet-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Health Tools</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access our comprehensive suite of healthcare calculators and tools designed to help you make informed decisions about your health
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={tool.path}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => navigate(tool.path)}
            >
              <div className={`group cursor-pointer bg-gradient-to-br ${tool.gradient} to-transparent text-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                <tool.icon className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-white/90">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthToolsPage;