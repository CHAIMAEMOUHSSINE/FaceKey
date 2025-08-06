import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MockCredentialsHelper = ({ currentLanguage = 'fr', onCredentialSelect = () => {} }) => {
  const [isVisible, setIsVisible] = useState(false);

  const translations = {
    fr: {
      demoCredentials: 'Identifiants de démonstration',
      selectRole: 'Sélectionner un rôle pour tester',
      employee: 'Employé',
      hrAdmin: 'Administrateur RH',
      systemAdmin: 'Administrateur Système',
      useCredentials: 'Utiliser ces identifiants',
      hide: 'Masquer',
      show: 'Afficher les identifiants de test'
    },
    en: {
      demoCredentials: 'Demo Credentials',
      selectRole: 'Select a role to test',
      employee: 'Employee',
      hrAdmin: 'HR Administrator',
      systemAdmin: 'System Administrator',
      useCredentials: 'Use these credentials',
      hide: 'Hide',
      show: 'Show test credentials'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const mockCredentials = [
    {
      role: 'employee',
      label: t?.employee,
      email: 'employee@lafargeholcim.com',
      password: 'emp123',
      icon: 'User',
      color: 'var(--color-primary)'
    },
    {
      role: 'hr',
      label: t?.hrAdmin,
      email: 'hr@lafargeholcim.com',
      password: 'hr123',
      icon: 'Users',
      color: 'var(--color-accent)'
    },
    {
      role: 'admin',
      label: t?.systemAdmin,
      email: 'admin@lafargeholcim.com',
      password: 'admin123',
      icon: 'Settings',
      color: 'var(--color-warning)'
    }
  ];

  const handleCredentialSelect = (credential) => {
    onCredentialSelect({
      email: credential?.email,
      password: credential?.password,
      role: credential?.role
    });
  };

  return (
    <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
          <Icon name="Info" size={16} color="var(--color-primary)" />
          <span>{t?.demoCredentials}</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(!isVisible)}
          iconName={isVisible ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
        >
          {isVisible ? t?.hide : t?.show}
        </Button>
      </div>
      {isVisible && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground mb-4">{t?.selectRole}</p>
          
          {mockCredentials?.map((credential) => (
            <div key={credential?.role} className="p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ backgroundColor: `${credential?.color}20` }}>
                    <Icon name={credential?.icon} size={16} color={credential?.color} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{credential?.label}</p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p className="font-mono">{credential?.email}</p>
                      <p className="font-mono">{credential?.password}</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCredentialSelect(credential)}
                  iconName="Copy"
                  iconPosition="left"
                >
                  {t?.useCredentials}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MockCredentialsHelper;