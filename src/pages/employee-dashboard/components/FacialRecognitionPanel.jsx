import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FacialRecognitionPanel = ({
                                  currentLanguage = 'fr',
                                  onClockIn = () => {},
                                  onClockOut = () => {},
                                  isClocked = false,
                                  isLoading = false
                                }) => {
  const [stream, setStream] = useState(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);

  const translations = {
    fr: {
      faceRecognition: 'Reconnaissance Faciale',
      startCamera: 'Démarrer la Caméra',
      stopCamera: 'Arrêter la Caméra',
      clockIn: 'Pointer',
      clockOut: 'Sortir',
      processing: 'Traitement...',
      privacyNotice: 'Avis de Confidentialité',
      privacyText: `Vos données biométriques sont traitées conformément au RGPD.\nElles sont utilisées uniquement pour l'authentification et ne sont pas partagées avec des tiers.\nVous pouvez demander la suppression de vos données à tout moment.`,
      instructions: 'Positionnez votre visage dans le cadre et cliquez sur le bouton approprié',cameraError: 'Erreur d\'accès à la caméra. Vérifiez les permissions.',
      noCamera: 'Aucune caméra détectée sur cet appareil',
      ready: 'Prêt pour la reconnaissance',
      lookAtCamera: 'Regardez directement la caméra'
    },
    en: {
      faceRecognition: 'Facial Recognition',
      startCamera: 'Start Camera',
      stopCamera: 'Stop Camera',
      clockIn: 'Clock In',
      clockOut: 'Clock Out',
      processing: 'Processing...',
      privacyNotice: 'Privacy Notice',
      privacyText: `Your biometric data is processed in compliance with GDPR.\nIt is used only for authentication and is not shared with third parties.\nYou can request deletion of your data at any time.`,
      instructions: 'Position your face in the frame and click the appropriate button',
      cameraError: 'Camera access error. Check permissions.',
      noCamera: 'No camera detected on this device',
      ready: 'Ready for recognition',
      lookAtCamera: 'Look directly at the camera'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  useEffect(() => {
    return () => {
      if (stream) {
        stream?.getTracks()?.forEach(track => track?.stop());
      }
    };
  }, [stream]);

  const startWebcam = async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices?.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });

      setStream(mediaStream);
      setIsWebcamActive(true);

      if (videoRef?.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
      setError(t?.cameraError);
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream?.getTracks()?.forEach(track => track?.stop());
      setStream(null);
      setIsWebcamActive(false);
      if (videoRef?.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const handleClockAction = async (action) => {
    if (!isWebcamActive) {
      setError('Veuillez démarrer la caméra d\'abord');
      return;
    }

    try {
      // Simulate facial recognition processing
      if (action === 'in') {
        await onClockIn();
      } else {
        await onClockOut();
      }
    } catch (err) {
      setError('Erreur lors de la reconnaissance faciale');
    }
  };

  return (
      <div className="bg-card border border-border rounded-xl shadow-elevation-2 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Camera" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{t?.faceRecognition}</h2>
              <p className="text-sm text-muted-foreground">{t?.instructions}</p>
            </div>
          </div>

          {/* Status Indicator */}
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
              isWebcamActive ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
                isWebcamActive ? 'bg-success pulse-status' : 'bg-muted-foreground'
            }`} />
            <span>{isWebcamActive ? t?.ready : 'Inactif'}</span>
          </div>
        </div>
        {/* Video Feed Container */}
        <div className="relative mb-6">
          <div className="relative w-full h-80 bg-muted rounded-lg overflow-hidden border-2 border-dashed border-border">
            {isWebcamActive ? (
                <>
                  <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                  />

                  {/* Face Detection Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-64 border-2 border-primary rounded-lg bg-transparent">
                      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary" />
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary" />
                    </div>
                  </div>

                  {/* Instructions Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm text-center">
                      {t?.lookAtCamera}
                    </div>
                  </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <Icon name="Camera" size={48} className="mb-4" />
                  <p className="text-lg font-medium mb-2">Caméra Désactivée</p>
                  <p className="text-sm text-center max-w-xs">
                    Cliquez sur "Démarrer la Caméra" pour commencer la reconnaissance faciale
                  </p>
                </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
              <div className="absolute top-4 left-4 right-4 bg-destructive/90 backdrop-blur-sm text-destructive-foreground px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} />
                <span>{error}</span>
              </div>
          )}
        </div>
        {/* Camera Controls */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          {!isWebcamActive ? (
              <Button
                  variant="outline"
                  onClick={startWebcam}
                  iconName="Camera"
                  iconPosition="left"
                  className="px-6"
              >
                {t?.startCamera}
              </Button>
          ) : (
              <Button
                  variant="secondary"
                  onClick={stopWebcam}
                  iconName="CameraOff"
                  iconPosition="left"
                  className="px-6"
              >
                {t?.stopCamera}
              </Button>
          )}
        </div>
        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button
              variant={isClocked ? "outline" : "success"}
              size="lg"
              onClick={() => handleClockAction('in')}
              disabled={!isWebcamActive || isLoading || isClocked}
              loading={isLoading && !isClocked}
              iconName="LogIn"
              iconPosition="left"
              fullWidth
          >
            {t?.clockIn}
          </Button>

          <Button
              variant={isClocked ? "destructive" : "outline"}
              size="lg"
              onClick={() => handleClockAction('out')}
              disabled={!isWebcamActive || isLoading || !isClocked}
              loading={isLoading && isClocked}
              iconName="LogOut"
              iconPosition="left"
              fullWidth
          >
            {t?.clockOut}
          </Button>
        </div>
        {/* Privacy Notice */}
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">{t?.privacyNotice}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                {t?.privacyText}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FacialRecognitionPanel;