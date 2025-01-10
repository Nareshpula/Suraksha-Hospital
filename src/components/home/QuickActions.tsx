import React from 'react';
import { Calendar, Building2, Siren } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ActionCard from './cards/ActionCard';

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute bottom-8 left-0 right-0 z-10">
      <div className="w-fit mx-auto px-4">
        <div className="flex flex-col space-y-2">
          <ActionCard
            icon={Calendar}
            title="Book Appointment"
            description="Schedule your visit"
            color="text-pink-600"
            bgColor="bg-pink-50"
            onClick={() => navigate('/appointments')}
          />
          <ActionCard
            icon={Building2}
            title="Find Hospital"
            description="Get directions to visit"
            color="text-olive-600"
            bgColor="bg-olive-50"
            onClick={() => {
              const locationSection = document.getElementById('location');
              if (locationSection) {
                locationSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
          <ActionCard
            icon={Siren}
            title="NICU Emergency"
            description="24/7 Neonatal Care"
            color="text-red-600"
            bgColor="bg-red-50"
            onClick={() => window.location.href = 'tel:+919666426748'}
          />
        </div>
      </div>
    </div>
  );
};
          {actions.map((action, index) => (
            <div
              key={index}
              className="transform transition-all duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ActionCard {...action} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;