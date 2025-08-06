import React from 'react';
import Icon from '../../../components/AppIcon';

const CompanyBranding = ({ currentLanguage = 'fr' }) => {
  const translations = {
    fr: {
      companyName: 'LafargeHolcim',
      systemName: 'FaceTime Attendance',
      tagline: 'Système de présence par reconnaissance faciale',
      secureAccess: 'Accès sécurisé'
    },
    en: {
      companyName: 'LafargeHolcim',
      systemName: 'FaceTime Attendance',
      tagline: 'Facial recognition attendance system',
      secureAccess: 'Secure Access'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  return (
    <div className="text-center mb-8">
      {/* Company Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-elevation-2">
          <Icon name="Camera" size={32} color="white" />
        </div>
      </div>
      {/* Company Information */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">{t?.companyName}</h2>
        <h3 className="text-lg font-medium text-primary">{t?.systemName}</h3>
        <p className="text-sm text-muted-foreground">{t?.tagline}</p>
      </div>
      {/* Security Badge */}
      <div className="flex items-center justify-center mt-6 space-x-2">
        <div className="flex items-center space-x-1 px-3 py-1 bg-success/10 border border-success/20 rounded-full">
          <Icon name="Shield" size={14} color="var(--color-success)" />
          <span className="text-xs font-medium text-success">{t?.secureAccess}</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyBranding;