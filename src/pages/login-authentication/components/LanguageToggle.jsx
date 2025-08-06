import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LanguageToggle = ({ currentLanguage = 'fr', onLanguageChange = () => {} }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (langCode) => {
    onLanguageChange(langCode);
    setIsDropdownOpen(false);
  };

  const currentLang = languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="hidden sm:inline text-sm">{currentLang?.label}</span>
        <Icon name="ChevronDown" size={16} />
      </Button>
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-popover border border-border rounded-lg shadow-elevation-2 py-1 z-50">
          {languages?.map((lang) => (
            <button
              key={lang?.code}
              onClick={() => handleLanguageSelect(lang?.code)}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-muted transition-smooth flex items-center space-x-2 ${
                currentLanguage === lang?.code ? 'bg-muted text-primary' : 'text-popover-foreground'
              }`}
            >
              <span className="text-lg">{lang?.flag}</span>
              <span>{lang?.label}</span>
              {currentLanguage === lang?.code && (
                <Icon name="Check" size={14} color="var(--color-primary)" className="ml-auto" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;