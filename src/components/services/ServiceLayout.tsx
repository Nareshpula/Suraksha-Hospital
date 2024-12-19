import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceLayoutProps {
  title: string;
  description: string;
  backgroundImage: string;
  children: React.ReactNode;
  gradientColors?: {
    from: string;
    to: string;
  };
}

const ServiceLayout: React.FC<ServiceLayoutProps> = ({
  title,
  description,
  backgroundImage,
  children,
  gradientColors = { from: 'olive-500/50', to: 'olive-900/50' }
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50 via-white to-olive-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-b from-${gradientColors.from} to-${gradientColors.to} flex items-center`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-white mb-8 hover:text-olive-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </button>
            <h1 className="text-5xl font-bold text-white mb-6">{title}</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {children}
      </div>
    </div>
  );
};

export default ServiceLayout;