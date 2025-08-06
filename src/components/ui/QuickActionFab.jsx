import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionFab = ({ 
  userRole = 'employee',
  currentLanguage = 'fr',
  onClockIn = () => {},
  onClockOut = () => {},
  isClocked = false,
  isLoading = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const translations = {
    fr: {
      clockIn: 'Pointer',
      clockOut: 'Sortir',
      faceRecognition: 'Reconnaissance Faciale',
      processing: 'Traitement...'
    },
    en: {
      clockIn: 'Clock In',
      clockOut: 'Clock Out',
      faceRecognition: 'Face Recognition',
      processing: 'Processing...'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  // Show/hide FAB based on scroll direction and user role
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Only show for employee role on mobile
    const shouldShow = userRole === 'employee' && window.innerWidth < 768;
    setIsVisible(shouldShow);

    if (shouldShow) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, userRole]);

  // Don't render if not employee role or on desktop
  if (userRole !== 'employee') {
    return null;
  }

  const handlePrimaryAction = () => {
    if (isClocked) {
      onClockOut();
    } else {
      onClockIn();
    }
  };

  const getPrimaryActionConfig = () => {
    if (isLoading) {
      return {
        icon: 'Loader2',
        label: t?.processing,
        variant: 'secondary',
        className: 'animate-spin'
      };
    }

    if (isClocked) {
      return {
        icon: 'LogOut',
        label: t?.clockOut,
        variant: 'destructive',
        className: ''
      };
    }

    return {
      icon: 'LogIn',
      label: t?.clockIn,
      variant: 'success',
      className: ''
    };
  };

  const actionConfig = getPrimaryActionConfig();

  return (
    <div className={`fixed bottom-6 right-6 z-50 md:hidden transition-smooth ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
    }`}>
      {/* Primary Action Button */}
      <div className="relative">
        <Button
          variant={actionConfig?.variant}
          size="lg"
          onClick={handlePrimaryAction}
          disabled={isLoading}
          className={`w-16 h-16 rounded-full shadow-elevation-3 hover:shadow-elevation-3 ${
            !isLoading ? 'hover:scale-105' : ''
          } transition-all duration-200 ${actionConfig?.className}`}
        >
          <div className="flex flex-col items-center">
            <Icon 
              name={actionConfig?.icon} 
              size={24} 
              color="currentColor"
            />
          </div>
        </Button>

        {/* Status Indicator */}
        {!isLoading && (
          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
            isClocked ? 'bg-success pulse-status' : 'bg-muted'
          }`} />
        )}
      </div>
      {/* Action Label */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-card border border-border rounded-lg shadow-elevation-2 text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        {actionConfig?.label}
      </div>
    </div>
  );
};

export default QuickActionFab;