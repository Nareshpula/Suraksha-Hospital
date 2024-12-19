import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <div 
      onClick={handleClick}
      className="flex items-center gap-4 group cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {/* Mother and Baby Image */}
      <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-lg">
        <img 
          src="https://plus.unsplash.com/premium_photo-1661292024143-a84def47313c"
          alt="Mother and Baby"
          className="w-full h-full object-cover object-[25%_25%] group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 group-hover:opacity-0 transition-opacity duration-300" />
      </div>

      {/* Hospital Name */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <span 
            className="text-3xl font-bold tracking-wider font-['Montserrat']"
            style={{ 
              color: '#FF7F50',
              letterSpacing: '1.5px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              background: 'linear-gradient(45deg, #FF7F50, #FF6B6B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Suraksha
          </span>
        </div>
        <div className="flex items-center mt-1">
          <div className="h-px w-4 bg-gradient-to-r from-[#FF7F50]/60 to-transparent" />
          <span 
            className="text-sm font-medium tracking-[0.2em] px-1"
            style={{ color: '#E0E0E0' }}
          >
            SPECIALITY HOSPITAL
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-[#FF7F50]/60 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Logo;