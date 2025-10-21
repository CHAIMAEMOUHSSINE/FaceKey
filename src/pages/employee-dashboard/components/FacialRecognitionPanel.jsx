import React, { useState, useRef, useEffect } from 'react';

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
  const [cameraReady, setCameraReady] = useState(false);
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
      instructions: 'Positionnez votre visage dans le cadre et cliquez sur le bouton approprié',
      cameraError: 'Erreur d\'accès à la caméra. Vérifiez les permissions.',
      noCamera: 'Aucune caméra détectée sur cet appareil',
      ready: 'Prêt pour la reconnaissance',
      lookAtCamera: 'Regardez directement la caméra',
      permissionDenied: 'Vous devez autoriser l\'accès à la caméra',
      cameraInactive: 'Inactif',
      cameraDisabled: 'Caméra Désactivée',
      clickToStart: 'Cliquez sur "Démarrer la Caméra" pour commencer'
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
      lookAtCamera: 'Look directly at the camera',
      permissionDenied: 'You must allow camera access',
      cameraInactive: 'Inactive',
      cameraDisabled: 'Camera Disabled',
      clickToStart: 'Click "Start Camera" to begin'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  // Nettoyer les ressources au démontage
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, [stream]);

  const startWebcam = async () => {
    try {
      setError('');
      setCameraReady(false);

      console.log('🎬 Demande d\'accès à la caméra...');

      // Demander accès à la caméra avec des paramètres minimaux
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 320, ideal: 640, max: 1280 },
          height: { min: 240, ideal: 480, max: 720 }
        }
      });

      console.log('✅ Flux caméra obtenu');
      setStream(mediaStream);
      setIsWebcamActive(true);

      // Assigner le stream à la vidéo
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;

        // Attendre vraiment que la vidéo soit prête
        videoRef.current.onloadedmetadata = () => {
          console.log('✅ Métadonnées vidéo chargées');
          setCameraReady(true);
        };

        // Gérer les erreurs de lecture
        videoRef.current.onerror = (err) => {
          console.error('❌ Erreur vidéo:', err);
          setError('Erreur lors de la lecture de la vidéo');
        };

        // Forcer la lecture après un délai
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play().catch(err => {
              console.error('❌ Erreur play():', err);
            });
          }
        }, 500);
      }
    } catch (err) {
      console.error('❌ Erreur accès webcam:', err);

      if (err.name === 'NotAllowedError') {
        setError(t?.permissionDenied);
      } else if (err.name === 'NotFoundError') {
        setError(t?.noCamera);
      } else if (err.name === 'NotReadableError') {
        setError('La caméra est utilisée par une autre application');
      } else {
        setError(t?.cameraError);
      }

      setIsWebcamActive(false);
      setCameraReady(false);
    }
  };

  const stopWebcam = () => {
    console.log('🛑 Arrêt caméra');

    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsWebcamActive(false);
    setCameraReady(false);
    setError('');
  };

  const handleClockAction = async (action) => {
    if (!isWebcamActive || !cameraReady) {
      setError(currentLanguage === 'fr' ? 'Veuillez démarrer la caméra d\'abord' : 'Please start the camera first');
      return;
    }

    try {
      if (action === 'in') {
        await onClockIn();
      } else {
        await onClockOut();
      }
    } catch (err) {
      console.error('Erreur action:', err);
      setError(currentLanguage === 'fr' ? 'Erreur lors de la reconnaissance' : 'Recognition error');
    }
  };

  return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📷</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{t?.faceRecognition}</h2>
              <p className="text-sm text-gray-600">{t?.instructions}</p>
            </div>
          </div>

          {/* Indicateur de statut */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
              isWebcamActive && cameraReady
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-200 text-gray-600'
          }`}>
          <span className={`w-3 h-3 rounded-full ${
              isWebcamActive && cameraReady
                  ? 'bg-green-500 animate-pulse'
                  : 'bg-gray-400'
          }`} />
            <span>{isWebcamActive && cameraReady ? t?.ready : t?.cameraInactive}</span>
          </div>
        </div>

        {/* Conteneur flux vidéo */}
        <div className="relative mb-8 bg-black rounded-lg overflow-hidden shadow-lg border-4 border-gray-300">
          <div className="aspect-video bg-black">
            <video
                ref={videoRef}
                autoPlay={true}
                playsInline={true}
                muted={true}
                className="w-full h-full object-cover"
                style={{ display: 'block' }}
            />
          </div>

          {/* Overlay détection visage */}
          {isWebcamActive && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-64 border-2 border-yellow-400 rounded-lg bg-transparent shadow-lg">
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-yellow-400" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-yellow-400" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-yellow-400" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-yellow-400" />
                </div>
              </div>
          )}

          {/* Instructions overlay */}
          {isWebcamActive && (
              <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm text-center font-medium">
                  {cameraReady ? t?.lookAtCamera : '⏳ Initialisation de la caméra...'}
                </div>
              </div>
          )}

          {/* Si caméra est inactive */}
          {!isWebcamActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <span className="text-6xl mb-4">📷</span>
                <p className="text-lg font-semibold text-white mb-2">{t?.cameraDisabled}</p>
                <p className="text-sm text-gray-400 text-center max-w-xs">
                  {t?.clickToStart}
                </p>
              </div>
          )}

          {/* Message d'erreur */}
          {error && (
              <div className="absolute top-4 left-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-pulse">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
          )}
        </div>

        {/* Contrôles caméra */}
        <div className="flex justify-center mb-6">
          {!isWebcamActive ? (
              <button
                  onClick={startWebcam}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
              >
                📷 {t?.startCamera}
              </button>
          ) : (
              <button
                  onClick={stopWebcam}
                  className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
              >
                ⏹️ {t?.stopCamera}
              </button>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
              onClick={() => handleClockAction('in')}
              disabled={!isWebcamActive || !cameraReady || isLoading || isClocked}
              className={`py-3 px-4 font-semibold rounded-lg transition-all duration-200 text-white ${
                  isClocked
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-green-600 hover:bg-green-700 active:scale-95'
              }`}
          >
            ➡️ {t?.clockIn}
          </button>

          <button
              onClick={() => handleClockAction('out')}
              disabled={!isWebcamActive || !cameraReady || isLoading || !isClocked}
              className={`py-3 px-4 font-semibold rounded-lg transition-all duration-200 text-white ${
                  !isClocked
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-red-600 hover:bg-red-700 active:scale-95'
              }`}
          >
            ⬅️ {t?.clockOut}
          </button>
        </div>

        {/* Avis de confidentialité */}
        <div className="bg-white border-l-4 border-blue-600 p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-800 mb-2">🛡️ {t?.privacyNotice}</h4>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {t?.privacyText}
          </p>
        </div>
      </div>
  );
};

export default FacialRecognitionPanel;