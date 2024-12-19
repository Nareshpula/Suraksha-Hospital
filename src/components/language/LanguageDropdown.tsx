import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from './LanguageContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'te', name: 'తెలుగు' }
];

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, changeLanguage, isLoading } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    if (isLoading) return;
    changeLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    setIsOpen(false);
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-white hover:text-emerald-200 transition-colors"
        disabled={isLoading}
      >
        <Globe className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        <span>{currentLang?.name || 'English'}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full text-left px-4 py-2 hover:bg-emerald-50 transition-colors ${
                currentLanguage === language.code ? 'text-emerald-600 font-medium' : 'text-gray-700'
              }`}
              disabled={isLoading}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;