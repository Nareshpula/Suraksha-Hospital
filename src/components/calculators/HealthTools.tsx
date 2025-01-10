import React from 'react';
import { Calendar, Scale, Syringe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HealthTools = () => {
  const navigate = useNavigate();

  const tools = [
    {
      icon: Calendar,
      title: 'Due Date Calculator',
      description: 'Calculate your expected delivery date',
      path: '/calculators/due-date',
      image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800',
      gradient: 'from-pink-600/80'
    },
    {
      icon: Scale,
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index',
      path: '/calculators/bmi',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
      gradient: 'from-emerald-600/80'
    },
    {
      icon: Syringe,
      title: 'Vaccination Schedule',
      description: 'Track your child\'s vaccination schedule',
      path: '/calculators/vaccination',
      image: 'https://images.unsplash.com/photo-1632053003385-245d2569568a?auto=format&fit=crop&q=80&w=800',
      gradient: 'from-blue-600/80'
    }
  ];

  return (
    <section id="health-tools" className="py-24 bg-gradient-to-b from-violet-50 to-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            >
              <div 
                onClick={() => navigate(tool.path)}
                className="group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${tool.gradient} to-transparent`} />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center mb-2">
                      <tool.icon className="w-6 h-6 mr-2" />
                      <h3 className="text-xl font-semibold">{tool.title}</h3>
                    </div>
                    <p className="text-white/90">{tool.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthTools;