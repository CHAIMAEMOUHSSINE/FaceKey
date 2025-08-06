import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ currentLanguage = 'fr', onLanguageChange = () => {} }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const translations = {
    fr: {
      title: 'Connexion',
      subtitle: 'Accédez à votre système de présence',
      email: 'Adresse e-mail',
      emailPlaceholder: 'Entrez votre adresse e-mail',
      password: 'Mot de passe',
      passwordPlaceholder: 'Entrez votre mot de passe',
      role: 'Rôle',
      rolePlaceholder: 'Sélectionnez votre rôle',
      signIn: 'Se connecter',
      forgotPassword: 'Mot de passe oublié ?',
      processing: 'Connexion en cours...',
      invalidCredentials: 'Identifiants invalides. Veuillez réessayer.',
      accountLocked: 'Compte verrouillé après 3 tentatives échouées.',
      requiredField: 'Ce champ est obligatoire',
      invalidEmail: 'Format d\'e-mail invalide',
      employee: 'Employé',
      hrAdmin: 'Administrateur RH',
      systemAdmin: 'Administrateur Système'
    },
    en: {
      title: 'Sign In',
      subtitle: 'Access your attendance system',
      email: 'Email Address',
      emailPlaceholder: 'Enter your email address',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      role: 'Role',
      rolePlaceholder: 'Select your role',
      signIn: 'Sign In',
      forgotPassword: 'Forgot Password?',
      processing: 'Signing in...',
      invalidCredentials: 'Invalid credentials. Please try again.',
      accountLocked: 'Account locked after 3 failed attempts.',
      requiredField: 'This field is required',
      invalidEmail: 'Invalid email format',
      employee: 'Employee',
      hrAdmin: 'HR Administrator',
      systemAdmin: 'System Administrator'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const roleOptions = [
    { value: 'employee', label: t?.employee },
    { value: 'hr', label: t?.hrAdmin },
    { value: 'admin', label: t?.systemAdmin }
  ];

  // Mock credentials for different roles
  const mockCredentials = {
    employee: { email: 'employee@lafargeholcim.com', password: 'emp123' },
    hr: { email: 'hr@lafargeholcim.com', password: 'hr123' },
    admin: { email: 'admin@lafargeholcim.com', password: 'admin123' }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = t?.requiredField;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = t?.invalidEmail;
    }

    if (!formData?.password) {
      newErrors.password = t?.requiredField;
    }

    if (!formData?.role) {
      newErrors.role = t?.requiredField;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (failedAttempts >= 3) {
      setErrors({ general: t?.accountLocked });
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const roleCredentials = mockCredentials?.[formData?.role];
      
      if (formData?.email === roleCredentials?.email && formData?.password === roleCredentials?.password) {
        // Store user data in localStorage
        localStorage.setItem('userRole', formData?.role);
        localStorage.setItem('userEmail', formData?.email);
        localStorage.setItem('currentLanguage', currentLanguage);
        localStorage.setItem('isAuthenticated', 'true');

        // Navigate based on role
        switch (formData?.role) {
          case 'employee': navigate('/employee-dashboard');
            break;
          case 'hr': case'admin': navigate('/hr-admin-dashboard');
            break;
          default:
            navigate('/employee-dashboard');
        }
      } else {
        setFailedAttempts(prev => prev + 1);
        setErrors({ 
          general: failedAttempts >= 2 ? t?.accountLocked : t?.invalidCredentials 
        });
      }
    } catch (error) {
      setErrors({ general: t?.invalidCredentials });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">{t?.title}</h1>
        <p className="text-muted-foreground">{t?.subtitle}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} color="var(--color-destructive)" />
              <p className="text-sm text-destructive">{errors?.general}</p>
            </div>
          </div>
        )}

        <Input
          label={t?.email}
          type="email"
          placeholder={t?.emailPlaceholder}
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        <div className="relative">
          <Input
            label={t?.password}
            type={showPassword ? 'text' : 'password'}
            placeholder={t?.passwordPlaceholder}
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
            disabled={isLoading}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        <Select
          label={t?.role}
          placeholder={t?.rolePlaceholder}
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => handleInputChange('role', value)}
          error={errors?.role}
          required
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading || failedAttempts >= 3}
          iconName={isLoading ? 'Loader2' : 'LogIn'}
          iconPosition="left"
        >
          {isLoading ? t?.processing : t?.signIn}
        </Button>

        <div className="text-center">
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-smooth"
            disabled={isLoading}
          >
            {t?.forgotPassword}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;