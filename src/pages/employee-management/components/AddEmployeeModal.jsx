import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddEmployeeModal = ({ 
  isOpen = false, 
  onClose = () => {}, 
  onSave = () => {},
  currentLanguage = 'fr' 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    startDate: '',
    faceImage: null
  });
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const translations = {
    fr: {
      addEmployee: 'Ajouter un Employé',
      personalInfo: 'Informations Personnelles',
      faceEnrollment: 'Inscription Faciale',
      confirmation: 'Confirmation',
      employeeId: 'ID Employé',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      department: 'Département',
      role: 'Rôle',
      startDate: 'Date de Début',
      next: 'Suivant',
      previous: 'Précédent',
      save: 'Enregistrer',
      cancel: 'Annuler',
      close: 'Fermer',
      webcamCapture: 'Capture Webcam',
      uploadImage: 'Télécharger Image',
      startWebcam: 'Démarrer Webcam',
      stopWebcam: 'Arrêter Webcam',
      capturePhoto: 'Capturer Photo',
      retakePhoto: 'Reprendre Photo',
      chooseFile: 'Choisir Fichier',
      privacyNotice: 'Avis de Confidentialité',
      privacyText: `Les données biométriques sont collectées uniquement pour l'authentification d'accès et sont stockées de manière sécurisée conformément au RGPD. Vous pouvez demander la suppression de ces données à tout moment.`,
      gdprCompliance: 'Conformité RGPD',
      consentText: 'J\'accepte le traitement de mes données biométriques',
      required: 'Requis',
      invalidEmail: 'Email invalide',
      step: 'Étape',
      of: 'sur',
      hr: 'RH',
      manager: 'Manager',
      employee: 'Employé',
      admin: 'Administrateur',
      it: 'Informatique',
      finance: 'Finance',
      operations: 'Opérations',
      sales: 'Ventes',
      marketing: 'Marketing'
    },
    en: {
      addEmployee: 'Add Employee',
      personalInfo: 'Personal Information',
      faceEnrollment: 'Face Enrollment',
      confirmation: 'Confirmation',
      employeeId: 'Employee ID',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      department: 'Department',
      role: 'Role',
      startDate: 'Start Date',
      next: 'Next',
      previous: 'Previous',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      webcamCapture: 'Webcam Capture',
      uploadImage: 'Upload Image',
      startWebcam: 'Start Webcam',
      stopWebcam: 'Stop Webcam',
      capturePhoto: 'Capture Photo',
      retakePhoto: 'Retake Photo',
      chooseFile: 'Choose File',
      privacyNotice: 'Privacy Notice',
      privacyText: `Biometric data is collected solely for access authentication and is stored securely in compliance with GDPR. You may request deletion of this data at any time.`,
      gdprCompliance: 'GDPR Compliance',
      consentText: 'I consent to the processing of my biometric data',
      required: 'Required',
      invalidEmail: 'Invalid email',
      step: 'Step',
      of: 'of',
      hr: 'HR',
      manager: 'Manager',
      employee: 'Employee',
      admin: 'Administrator',
      it: 'IT',
      finance: 'Finance',
      operations: 'Operations',
      sales: 'Sales',
      marketing: 'Marketing'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const departmentOptions = [
    { value: '', label: `-- ${t?.department} --` },
    { value: 'IT', label: t?.it },
    { value: 'Finance', label: t?.finance },
    { value: 'Operations', label: t?.operations },
    { value: 'Sales', label: t?.sales },
    { value: 'Marketing', label: t?.marketing },
    { value: 'HR', label: t?.hr }
  ];

  const roleOptions = [
    { value: '', label: `-- ${t?.role} --` },
    { value: 'employee', label: t?.employee },
    { value: 'manager', label: t?.manager },
    { value: 'admin', label: t?.admin },
    { value: 'hr', label: t?.hr }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
        setIsWebcamActive(true);
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const stopWebcam = () => {
    if (videoRef?.current && videoRef?.current?.srcObject) {
      const tracks = videoRef?.current?.srcObject?.getTracks();
      tracks?.forEach(track => track?.stop());
      videoRef.current.srcObject = null;
      setIsWebcamActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef?.current && canvasRef?.current) {
      const canvas = canvasRef?.current;
      const video = videoRef?.current;
      const context = canvas?.getContext('2d');
      
      canvas.width = video?.videoWidth;
      canvas.height = video?.videoHeight;
      context?.drawImage(video, 0, 0);
      
      const imageData = canvas?.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      setFormData(prev => ({ ...prev, faceImage: imageData }));
      stopWebcam();
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e?.target?.result;
        setCapturedImage(imageData);
        setFormData(prev => ({ ...prev, faceImage: imageData }));
      };
      reader?.readAsDataURL(file);
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData?.employeeId && formData?.firstName && formData?.lastName && 
               formData?.email && formData?.department && formData?.role;
      case 2:
        return formData?.faceImage;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(formData);
      handleClose();
    } catch (error) {
      console.error('Error saving employee:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    stopWebcam();
    setCurrentStep(1);
    setFormData({
      employeeId: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      role: '',
      startDate: '',
      faceImage: null
    });
    setCapturedImage(null);
    onClose();
  };

  if (!isOpen) return null;

  const steps = [
    { number: 1, title: t?.personalInfo },
    { number: 2, title: t?.faceEnrollment },
    { number: 3, title: t?.confirmation }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{t?.addEmployee}</h2>
            <p className="text-sm text-muted-foreground">
              {t?.step} {currentStep} {t?.of} {steps?.length}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            {steps?.map((step, index) => (
              <div key={step?.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= step?.number 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step?.number ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    step?.number
                  )}
                </div>
                <span className={`ml-2 text-sm ${
                  currentStep >= step?.number ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </span>
                {index < steps?.length - 1 && (
                  <div className={`w-12 h-px mx-4 ${
                    currentStep > step?.number ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label={t?.employeeId}
                  type="text"
                  value={formData?.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e?.target?.value)}
                  placeholder="EMP001"
                  required
                />
                <Input
                  label={t?.firstName}
                  type="text"
                  value={formData?.firstName}
                  onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                  placeholder="Jean"
                  required
                />
                <Input
                  label={t?.lastName}
                  type="text"
                  value={formData?.lastName}
                  onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                  placeholder="Dupont"
                  required
                />
                <Input
                  label={t?.email}
                  type="email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  placeholder="jean.dupont@lafargeholcim.com"
                  required
                />
                <Input
                  label={t?.phone}
                  type="tel"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  placeholder="+33 1 23 45 67 89"
                />
                <Input
                  label={t?.startDate}
                  type="date"
                  value={formData?.startDate}
                  onChange={(e) => handleInputChange('startDate', e?.target?.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label={t?.department}
                  options={departmentOptions}
                  value={formData?.department}
                  onChange={(value) => handleInputChange('department', value)}
                  required
                />
                <Select
                  label={t?.role}
                  options={roleOptions}
                  value={formData?.role}
                  onChange={(value) => handleInputChange('role', value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Face Enrollment */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Privacy Notice */}
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Shield" size={20} color="var(--color-primary)" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">
                      {t?.privacyNotice} - {t?.gdprCompliance}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {t?.privacyText}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Webcam Section */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-foreground">{t?.webcamCapture}</h4>
                  
                  <div className="relative bg-muted rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    {isWebcamActive ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : capturedImage ? (
                      <Image
                        src={capturedImage}
                        alt="Captured face"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <Icon name="Camera" size={48} color="var(--color-muted-foreground)" />
                          <p className="text-sm text-muted-foreground mt-2">
                            Cliquez pour démarrer la webcam
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    {!isWebcamActive && !capturedImage && (
                      <Button onClick={startWebcam} className="flex-1">
                        <Icon name="Camera" size={16} />
                        <span className="ml-2">{t?.startWebcam}</span>
                      </Button>
                    )}
                    {isWebcamActive && (
                      <>
                        <Button onClick={capturePhoto} className="flex-1">
                          <Icon name="Camera" size={16} />
                          <span className="ml-2">{t?.capturePhoto}</span>
                        </Button>
                        <Button variant="outline" onClick={stopWebcam}>
                          <Icon name="Square" size={16} />
                          <span className="ml-2">{t?.stopWebcam}</span>
                        </Button>
                      </>
                    )}
                    {capturedImage && (
                      <Button variant="outline" onClick={() => {
                        setCapturedImage(null);
                        setFormData(prev => ({ ...prev, faceImage: null }));
                      }}>
                        <Icon name="RotateCcw" size={16} />
                        <span className="ml-2">{t?.retakePhoto}</span>
                      </Button>
                    )}
                  </div>
                </div>

                {/* File Upload Section */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-foreground">{t?.uploadImage}</h4>
                  
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-smooth"
                    onClick={() => fileInputRef?.current?.click()}
                  >
                    <Icon name="Upload" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                    <p className="text-sm text-foreground mb-2">{t?.chooseFile}</p>
                    <p className="text-xs text-muted-foreground">
                      Formats supportés: JPG, PNG (max 5MB)
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-muted rounded-lg p-6">
                <h4 className="text-lg font-medium text-foreground mb-4">
                  Résumé de l'employé
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{t?.employeeId}</p>
                      <p className="text-sm font-medium text-foreground">{formData?.employeeId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Nom complet</p>
                      <p className="text-sm font-medium text-foreground">
                        {formData?.firstName} {formData?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t?.email}</p>
                      <p className="text-sm font-medium text-foreground">{formData?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t?.phone}</p>
                      <p className="text-sm font-medium text-foreground">{formData?.phone || 'Non renseigné'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{t?.department}</p>
                      <p className="text-sm font-medium text-foreground">{formData?.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t?.role}</p>
                      <p className="text-sm font-medium text-foreground">{formData?.role}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t?.startDate}</p>
                      <p className="text-sm font-medium text-foreground">
                        {formData?.startDate ? new Date(formData.startDate)?.toLocaleDateString() : 'Non renseigné'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Photo d'identité</p>
                      <p className="text-sm font-medium text-success">✓ Capturée</p>
                    </div>
                  </div>
                </div>

                {formData?.faceImage && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Aperçu de la photo</p>
                    <div className="w-24 h-24 rounded-lg overflow-hidden">
                      <Image
                        src={formData?.faceImage}
                        alt="Employee face"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex space-x-3">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevious}>
                <Icon name="ChevronLeft" size={16} />
                <span className="ml-1">{t?.previous}</span>
              </Button>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button variant="ghost" onClick={handleClose}>
              {t?.cancel}
            </Button>
            {currentStep < steps?.length ? (
              <Button 
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
              >
                <span className="mr-1">{t?.next}</span>
                <Icon name="ChevronRight" size={16} />
              </Button>
            ) : (
              <Button 
                onClick={handleSave}
                loading={isLoading}
                disabled={!validateStep(currentStep)}
              >
                <Icon name="Save" size={16} />
                <span className="ml-2">{t?.save}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;