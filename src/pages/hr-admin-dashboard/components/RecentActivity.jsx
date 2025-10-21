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
      employeeName: 'Fatima Zahrae Benjelloun',
      employeeId: 'EMP001',
      department: 'Production',
      action: 'clockedIn',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_leCcXhNQEj8kDXo4yen-wGgNmRke9e1mOYmjLk942gu-xe=s900-c-k-c0x00ffffff-no-rj',
      isLate: false
    },
    {
      id: 2,
      employeeName: 'Zaid Mouhssine',
      employeeId: 'EMP002',
      department: 'Service Informatique',
      action: 'clockedIn',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      avatar: 'data:image/jpeg;base64,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',
      isLate: true
    },
    {
      id: 3,
      employeeName: 'Latifa Moutawakil',
      employeeId: 'EMP003',
      department: 'Qualité',
      action: 'clockedOut',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQFtmv9ULtF1yw/profile-displayphoto-shrink_200_200/B4EZTSx_iVHcAc-/0/1738703110697?e=2147483647&v=beta&t=D772woxGd5Meip4UxvxZONheA2r9FnnCiCDQQfkco1I',
      isLate: false
    },
    {
      id: 4,
      employeeName: ' Halima id Ouaksim',
      employeeId: 'EMP004',
      department: 'Maintenance',
      action: 'clockedIn',
      timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
      avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQHgOn7q7CtHMw/profile-displayphoto-scale_200_200/B4EZeDeBz6GwAY-/0/1750257378738?e=2147483647&v=beta&t=nlgALanEGmMfYTgNAUVphm02BH7_RygRG7T9JFj2gfQ',
      isLate: false
    },
    {
      id: 5,
      employeeName: 'Fatima el Abadi',
      employeeId: 'EMP005',
      department: 'Logistique',
      action: 'clockedIn',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQGG3Xc1fAqOyg/profile-displayphoto-scale_200_200/B4EZfRBxZKGcAg-/0/1751558594145?e=2147483647&v=beta&t=2_jcGevY0UIWdLc8q2vkxF6SFPs42ZHOc3TJx93b67A',
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