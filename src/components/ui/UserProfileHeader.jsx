import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UserProfileHeader = ({ 
  user = { name: 'Yasmine', role: 'Employé', avatar: null },
  onLogout = () => {},
  onLanguageChange = () => {},
  currentLanguage = 'fr'
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': case'administrateur':
        return 'bg-primary text-primary-foreground';
      case 'hr': case'rh':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
  ];

  const handleLanguageSelect = (langCode) => {
    onLanguageChange(langCode);
    setIsDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Camera" size={24} color="white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-foreground">AutoPointage</h1>
            <p className="text-xs text-muted-foreground">LafargeHolcim Maroc</p>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2"
            >
              <span className="text-sm">
                {languages?.find(lang => lang?.code === currentLanguage)?.flag}
              </span>
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
                    <span>{lang?.flag}</span>
                    <span>{lang?.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <div className="flex items-center justify-end space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role)}`}>
                  {user?.role}
                </span>
              </div>
            </div>

            {/* Avatar */}
            <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full border-2 border-border">
              {user?.avatar ? (
                <img 
                  src={user?.avatar} 
                  alt={user?.name}
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              ) : (
                <Icon name="User" size={20} color="var(--color-muted-foreground)" />
              )}
            </div>

            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-muted-foreground hover:text-destructive"
            >
              <Icon name="LogOut" size={18} />
              <span className="hidden sm:inline ml-2">
                {currentLanguage === 'fr' ? 'Déconnexion' : 'Logout'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserProfileHeader;