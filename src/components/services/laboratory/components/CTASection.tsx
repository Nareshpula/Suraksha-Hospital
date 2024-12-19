import React from 'react';

const CTASection = () => {
  return (
    <div className="mt-16 flex justify-center space-x-12">
      <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
        Book a Test
      </button>
      <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-colors duration-300 shadow-lg hover:shadow-xl border border-indigo-200">
        Request for More Information
      </button>
    </div>
  );
};

export default CTASection;
