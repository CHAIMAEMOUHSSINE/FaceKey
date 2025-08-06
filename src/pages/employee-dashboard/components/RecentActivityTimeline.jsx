import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityTimeline = ({ 
  currentLanguage = 'fr',
  activities = []
}) => {
  const translations = {
    fr: {
      recentActivity: 'Activité Récente',
      clockIn: 'Arrivée',
      clockOut: 'Départ',
      break: 'Pause',
      resume: 'Reprise',
      today: 'Aujourd\'hui',
      yesterday: 'Hier',
      thisWeek: 'Cette Semaine',
      noActivity: 'Aucune activité récente',
      viewAll: 'Voir Tout'
    },
    en: {
      recentActivity: 'Recent Activity',
      clockIn: 'Clock In',
      clockOut: 'Clock Out',
      break: 'Break',
      resume: 'Resume',
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This Week',
      noActivity: 'No recent activity',
      viewAll: 'View All'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  // Mock data if no activities provided
  const mockActivities = [
    {
      id: 1,
      type: 'clock_in',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      location: 'Bureau Principal',
      method: 'facial_recognition'
    },
    {
      id: 2,
      type: 'break',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      location: 'Salle de Pause',
      method: 'manual'
    },
    {
      id: 3,
      type: 'resume',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      location: 'Bureau Principal',
      method: 'facial_recognition'
    },
    {
      id: 4,
      type: 'clock_out',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      location: 'Bureau Principal',
      method: 'facial_recognition'
    },
    {
      id: 5,
      type: 'clock_in',
      timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000), // Yesterday
      location: 'Bureau Principal',
      method: 'facial_recognition'
    }
  ];

  const displayActivities = activities?.length > 0 ? activities : mockActivities;

  const getActivityConfig = (type) => {
    const configs = {
      clock_in: {
        label: t?.clockIn,
        icon: 'LogIn',
        color: 'text-success',
        bgColor: 'bg-success/10',
        borderColor: 'border-success/20'
      },
      clock_out: {
        label: t?.clockOut,
        icon: 'LogOut',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/20'
      },
      break: {
        label: t?.break,
        icon: 'Coffee',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/20'
      },
      resume: {
        label: t?.resume,
        icon: 'Play',
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        borderColor: 'border-accent/20'
      }
    };
    return configs?.[type] || configs?.clock_in;
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor((now - date) / (1000 * 60));
      return `Il y a ${minutes} min`;
    } else if (diffInHours < 24) {
      return date?.toLocaleTimeString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (diffInHours < 48) {
      return `${t?.yesterday} ${date?.toLocaleTimeString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    } else {
      return date?.toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getMethodIcon = (method) => {
    return method === 'facial_recognition' ? 'Camera' : 'Smartphone';
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-elevation-2 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Activity" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{t?.recentActivity}</h3>
            <p className="text-sm text-muted-foreground">5 dernières entrées</p>
          </div>
        </div>
        
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth">
          {t?.viewAll}
        </button>
      </div>
      {/* Timeline */}
      {displayActivities?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icon name="Clock" size={48} color="var(--color-muted-foreground)" className="mb-4" />
          <p className="text-muted-foreground font-medium">{t?.noActivity}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Vos activités récentes apparaîtront ici
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayActivities?.slice(0, 5)?.map((activity, index) => {
            const config = getActivityConfig(activity?.type);
            const isLast = index === displayActivities?.slice(0, 5)?.length - 1;
            
            return (
              <div key={activity?.id} className="relative">
                {/* Timeline Line */}
                {!isLast && (
                  <div className="absolute left-5 top-12 w-0.5 h-8 bg-border" />
                )}
                <div className="flex items-start space-x-4">
                  {/* Activity Icon */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${config?.bgColor} ${config?.borderColor}`}>
                    <Icon name={config?.icon} size={18} color={`var(--color-${config?.color?.split('-')?.[1]})`} />
                  </div>
                  
                  {/* Activity Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${config?.color}`}>
                          {config?.label}
                        </span>
                        <Icon 
                          name={getMethodIcon(activity?.method)} 
                          size={14} 
                          color="var(--color-muted-foreground)" 
                        />
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">
                        {formatTime(activity?.timestamp)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-1">
                      <Icon name="MapPin" size={12} color="var(--color-muted-foreground)" />
                      <span className="text-xs text-muted-foreground">
                        {activity?.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Footer Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Cette Semaine</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">48</p>
            <p className="text-xs text-muted-foreground">Ce Mois</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">98%</p>
            <p className="text-xs text-muted-foreground">Précision</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityTimeline;