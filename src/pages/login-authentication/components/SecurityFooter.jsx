import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFooter = ({ currentLanguage = 'fr' }) => {
  const translations = {
    fr: {
      gdprCompliance: 'Conforme RGPD',
      dataProtection: 'Protection des données biométriques',
      enterpriseSecurity: 'Sécurité entreprise',
      copyright: 'Tous droits réservés',
      privacyPolicy: 'Politique de confidentialité',
      termsOfService: 'Conditions d\'utilisation',
      securityCertified: 'Certifié sécurisé'
    },
    en: {
      gdprCompliance: 'GDPR Compliant',
      dataProtection: 'Biometric data protection',
      enterpriseSecurity: 'Enterprise security',
      copyright: 'All rights reserved',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      securityCertified: 'Security Certified'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;
  const currentYear = new Date()?.getFullYear();

  const securityFeatures = [
    { icon: 'Shield', label: t?.gdprCompliance },
    { icon: 'Lock', label: t?.dataProtection },
    { icon: 'Award', label: t?.securityCertified }
  ];

  return (
    <footer className="mt-12 pt-8 border-t border-border">
      {/* Security Certifications */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg">
            <Icon name={feature?.icon} size={16} color="var(--color-success)" />
            <span className="text-xs font-medium text-muted-foreground">{feature?.label}</span>
          </div>
        ))}
      </div>
      {/* Links */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-4 text-xs">
        <button className="text-muted-foreground hover:text-primary transition-smooth">
          {t?.privacyPolicy}
        </button>
        <span className="text-border">•</span>
        <button className="text-muted-foreground hover:text-primary transition-smooth">
          {t?.termsOfService}
        </button>
      </div>
      {/* Copyright */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          © {currentYear} LafargeHolcim. {t?.copyright}
        </p>
      </div>
    </footer>
  );
};

export default SecurityFooter;