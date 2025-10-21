import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import UserService from "../../../service/userService";

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
      subtitle: 'Accédez à votre système de AutoPointage' ,
      email: 'Adresse e-mail',
      emailPlaceholder: 'Entrez votre adresse e-mail',
      password: 'Mot de passe',
      passwordPlaceholder: 'Entrez votre mot de passe',
      signIn: 'Se connecter',
      forgotPassword: 'Mot de passe oublié ?',
      processing: 'Connexion en cours...',
      invalidCredentials: 'Identifiants invalides. Veuillez réessayer.',
      accountLocked: 'Compte verrouillé après 3 tentatives échouées.',
      requiredField: 'Ce champ est obligatoire',
      invalidEmail: 'Format d\'e-mail invalide',
    },
    en: {
      title: 'Sign In',
      subtitle: 'Access your attendance system',
      email: 'Email Address',
      emailPlaceholder: 'Enter your email address',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      signIn: 'Sign In',
      forgotPassword: 'Forgot Password?',
      processing: 'Signing in...',
      invalidCredentials: 'Invalid credentials. Please try again.',
      accountLocked: 'Account locked after 3 failed attempts.',
      requiredField: 'This field is required',
      invalidEmail: 'Invalid email format',
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.email) {
      newErrors.email = t?.requiredField;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.email)) {
      newErrors.email = t?.invalidEmail;
    }
    if (!formData?.password) {
      newErrors.password = t?.requiredField;
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
      const roleCredentials = await UserService.getEmployeeLogin(formData?.email, formData?.password);

      if (formData?.email === roleCredentials?.email && formData?.password === roleCredentials?.password) {
        localStorage.setItem('userRole', roleCredentials?.role);
        localStorage.setItem('id', roleCredentials?.id);
        localStorage.setItem('userEmail', formData?.email);
        localStorage.setItem('fullName', roleCredentials?.fullName);
        localStorage.setItem('currentLanguage', currentLanguage);
        localStorage.setItem('isAuthenticated', 'true');

        navigate('/employee-dashboard'); // change this based on role if needed
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
      <div
          className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      >
        {/* Form card */}
        <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-[#F5F0E1]/90">
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
      </div>
  );
};

export default LoginForm;
