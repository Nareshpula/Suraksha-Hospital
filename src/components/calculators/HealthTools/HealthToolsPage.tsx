import React from 'react';
import { useNavigate } from 'react-router-dom';
import ToolCard from './components/ToolCard';
import { healthTools } from './data/tools';

const HealthToolsPage = () => {
  const navigate = useNavigate();

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
          {healthTools.map((tool, index) => (
            <div
              key={tool.path}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ToolCard
                {...tool}
                onClick={() => navigate(tool.path)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthToolsPage;