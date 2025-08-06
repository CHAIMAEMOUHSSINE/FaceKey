import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import CompanyBranding from './components/CompanyBranding';
import LanguageToggle from './components/LanguageToggle';
import SecurityFooter from './components/SecurityFooter';
import MockCredentialsHelper from './components/MockCredentialsHelper';

const LoginAuthentication = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (isAuthenticated === 'true' && userRole) {
      // Redirect to appropriate dashboard
      switch (userRole) {
        case 'employee': navigate('/employee-dashboard');
          break;
        case 'hr': case'admin': navigate('/hr-admin-dashboard');
          break;
        default:
          navigate('/employee-dashboard');
      }
    }

    // Load saved language preference
    const savedLanguage = localStorage.getItem('currentLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, [navigate]);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('currentLanguage', langCode);
  };

  const handleCredentialSelect = (credentials) => {
    // This would typically populate the form fields
    // For demo purposes, we'll show an alert
    const event = new CustomEvent('fillCredentials', { detail: credentials });
    document.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
      {/* Language Toggle - Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageToggle 
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-card border border-border rounded-2xl shadow-elevation-3 p-8">
            {/* Company Branding */}
            <CompanyBranding currentLanguage={currentLanguage} />
            
            {/* Login Form */}
            <LoginForm 
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>

          {/* Mock Credentials Helper */}
          <MockCredentialsHelper
            currentLanguage={currentLanguage}
            onCredentialSelect={handleCredentialSelect}
          />

          {/* Security Footer */}
          <SecurityFooter currentLanguage={currentLanguage} />
        </div>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/3 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default LoginAuthentication;