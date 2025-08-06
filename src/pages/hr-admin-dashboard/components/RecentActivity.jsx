import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivity = ({ currentLanguage = 'fr' }) => {
  const translations = {
    fr: {
      recentActivity: 'Activité Récente',
      clockedIn: 'a pointé',
      clockedOut: 'est sorti',
      late: 'en retard',
      viewAll: 'Voir Tout',
      now: 'maintenant',
      minutesAgo: 'min',
      hoursAgo: 'h'
    },
    en: {
      recentActivity: 'Recent Activity',
      clockedIn: 'clocked in',
      clockedOut: 'clocked out',
      late: 'late',
      viewAll: 'View All',
      now: 'now',
      minutesAgo: 'min',
      hoursAgo: 'h'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const activities = [
    {
      id: 1,
      employeeName: 'Marie Dubois',
      employeeId: 'EMP001',
      department: 'Production',
      action: 'clockedIn',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      isLate: false
    },
    {
      id: 2,
      employeeName: 'Jean Martin',
      employeeId: 'EMP002',
      department: 'Administration',
      action: 'clockedIn',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      isLate: true
    },
    {
      id: 3,
      employeeName: 'Sophie Laurent',
      employeeId: 'EMP003',
      department: 'Qualité',
      action: 'clockedOut',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      isLate: false
    },
    {
      id: 4,
      employeeName: 'Pierre Moreau',
      employeeId: 'EMP004',
      department: 'Maintenance',
      action: 'clockedIn',
      timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isLate: false
    },
    {
      id: 5,
      employeeName: 'Amélie Rousseau',
      employeeId: 'EMP005',
      department: 'Logistique',
      action: 'clockedIn',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      isLate: true
    }
  ];

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / 60000);
    
    if (diffInMinutes < 1) return t?.now;
    if (diffInMinutes < 60) return `${diffInMinutes}${t?.minutesAgo}`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours}${t?.hoursAgo}`;
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'clockedIn':
        return 'LogIn';
      case 'clockedOut':
        return 'LogOut';
      default:
        return 'Clock';
    }
  };

  const getActionColor = (action, isLate) => {
    if (isLate) return 'text-warning';
    switch (action) {
      case 'clockedIn':
        return 'text-success';
      case 'clockedOut':
        return 'text-muted-foreground';
      default:
        return 'text-primary';
    }
  };

  const getActionText = (action, isLate) => {
    const baseText = action === 'clockedIn' ? t?.clockedIn : t?.clockedOut;
    return isLate ? `${baseText} (${t?.late})` : baseText;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{t?.recentActivity}</h2>
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth">
            {t?.viewAll}
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {activities?.map((activity) => (
          <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-smooth">
            <div className="flex items-center space-x-4">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border">
                  <Image
                    src={activity?.avatar}
                    alt={activity?.employeeName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card flex items-center justify-center ${getActionColor(activity?.action, activity?.isLate)} bg-card`}>
                  <Icon 
                    name={getActionIcon(activity?.action)} 
                    size={10} 
                    color="currentColor"
                  />
                </div>
              </div>

              {/* Activity Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity?.employeeName}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    ({activity?.employeeId})
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 mt-1">
                  <p className={`text-sm ${getActionColor(activity?.action, activity?.isLate)}`}>
                    {getActionText(activity?.action, activity?.isLate)}
                  </p>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {activity?.department}
                  </span>
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex-shrink-0 text-right">
                <p className="text-xs text-muted-foreground">
                  {getTimeAgo(activity?.timestamp)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity?.timestamp?.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View More Button */}
      <div className="p-4 border-t border-border">
        <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium py-2 hover:bg-muted/50 rounded-lg transition-smooth">
          {t?.viewAll}
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;