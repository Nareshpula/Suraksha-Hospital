import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from '../language/LanguageContext';

const MobileLanguageSelector = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { currentLanguage, changeLanguage } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'te', name: 'తెలుగు' }
  ];

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    setIsExpanded(false);
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="px-4 py-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-white/90 px-4 py-2 rounded-md hover:bg-emerald-600/50"
      >
        <div className="flex items-center">
          <Globe className="w-4 h-4 mr-2" />
          <span>{currentLang?.name || 'English'}</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {isExpanded && (
        <div className="mt-1 space-y-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                currentLanguage === lang.code
                  ? 'bg-emerald-600 text-white'
                  : 'text-white hover:bg-emerald-600/50'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileLanguageSelector;