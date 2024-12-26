import React from 'react';

const WelcomeText = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-[70vh] text-white px-4">
      <h1 className="welcome-text text-4xl md:text-6xl font-bold text-center mb-6 opacity-0 animate-fade-in">
        Welcome to Bysani Suraksha Speciality Hospital
      </h1>
      <p className="sub-text text-xl md:text-2xl text-center mb-16 max-w-3xl mx-auto opacity-0 animate-fade-in-delayed">
        Where Advanced General Physician Diabetologist and Pediatric Care Meets Medical Excellence
      </p>
    </div>
  );
};

export default WelcomeText;