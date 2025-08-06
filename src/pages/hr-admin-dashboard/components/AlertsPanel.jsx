import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = ({ currentLanguage = 'fr' }) => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Retards Fréquents',
      message: 'Jean Martin a été en retard 3 fois cette semaine',
      timestamp: new Date(Date.now() - 1800000),
      isRead: false,
      employeeId: 'EMP002'
    },
    {
      id: 2,
      type: 'error',
      title: 'Absence Non Justifiée',
      message: 'Paul Durand absent depuis 2 jours sans notification',
      timestamp: new Date(Date.now() - 3600000),
      isRead: false,
      employeeId: 'EMP015'
    },
    {
      id: 3,
      type: 'info',
      title: 'Nouveau Employé',
      message: 'Sophie Laurent a été ajoutée au système',
      timestamp: new Date(Date.now() - 7200000),
      isRead: true,
      employeeId: 'EMP003'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Heures Supplémentaires',
      message: 'Marie Dubois: 12h de travail aujourd\'hui',
      timestamp: new Date(Date.now() - 10800000),
      isRead: false,
      employeeId: 'EMP001'
    }
  ]);

  const translations = {
    fr: {
      alerts: 'Alertes',
      markAllRead: 'Tout Marquer Lu',
      dismiss: 'Ignorer',
      viewEmployee: 'Voir Employé',
      noAlerts: 'Aucune alerte',
      now: 'maintenant',
      minutesAgo: 'min',
      hoursAgo: 'h'
    },
    en: {
      alerts: 'Alerts',
      markAllRead: 'Mark All Read',
      dismiss: 'Dismiss',
      viewEmployee: 'View Employee',
      noAlerts: 'No alerts',
      now: 'now',
      minutesAgo: 'min',
      hoursAgo: 'h'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / 60000);
    
    if (diffInMinutes < 1) return t?.now;
    if (diffInMinutes < 60) return `${diffInMinutes}${t?.minutesAgo}`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours}${t?.hoursAgo}`;
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return 'AlertCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-destructive';
      case 'warning':
        return 'text-warning';
      case 'info':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getAlertBgColor = (type) => {
    switch (type) {
      case 'error':
        return 'bg-destructive/10';
      case 'warning':
        return 'bg-warning/10';
      case 'info':
        return 'bg-primary/10';
      default:
        return 'bg-muted/10';
    }
  };

  const markAsRead = (alertId) => {
    setAlerts(prev => prev?.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert.id !== alertId));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev?.map(alert => ({ ...alert, isRead: true })));
  };

  const unreadCount = alerts?.filter(alert => !alert.isRead)?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-foreground">{t?.alerts}</h2>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-primary-foreground bg-primary rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              {t?.markAllRead}
            </Button>
          )}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {alerts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} color="var(--color-success)" className="mx-auto mb-4" />
            <p className="text-muted-foreground">{t?.noAlerts}</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {alerts?.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 hover:bg-muted/50 transition-smooth ${
                  !alert.isRead ? 'bg-muted/20' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Alert Icon */}
                  <div className={`flex-shrink-0 p-2 rounded-lg ${getAlertBgColor(alert.type)}`}>
                    <Icon 
                      name={getAlertIcon(alert.type)} 
                      size={16} 
                      color="currentColor"
                      className={getAlertColor(alert.type)}
                    />
                  </div>

                  {/* Alert Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-foreground">
                        {alert.title}
                      </p>
                      {!alert.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {alert.message}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {getTimeAgo(alert.timestamp)}
                      </span>
                      
                      <div className="flex items-center space-x-2">
                        {!alert.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(alert.id)}
                            className="text-xs h-6 px-2"
                          >
                            Marquer lu
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissAlert(alert.id)}
                          className="text-xs h-6 px-2 text-muted-foreground hover:text-destructive"
                        >
                          {t?.dismiss}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;