import React from 'react';
import Icon from '../../../components/AppIcon';

const TodaySummaryCard = ({ 
  currentLanguage = 'fr',
  clockInTime = null,
  totalHours = '0h 00m',
  currentStatus = 'out',
  isClocked = false
}) => {
  const translations = {
    fr: {
      todaySummary: 'Résumé d\'Aujourd\'hui',
      clockInTime: 'Heure d\'Arrivée',
      totalHours: 'Heures Totales',
      currentStatus: 'Statut Actuel',
      clockedIn: 'Présent',
      clockedOut: 'Absent',
      notClockedIn: 'Non Pointé',
      workingTime: 'Temps de Travail',
      breakTime: 'Temps de Pause',
      expectedHours: 'Heures Prévues',
      overtime: 'Heures Supplémentaires'
    },
    en: {
      todaySummary: 'Today\'s Summary',
      clockInTime: 'Clock In Time',
      totalHours: 'Total Hours',
      currentStatus: 'Current Status',
      clockedIn: 'Clocked In',
      clockedOut: 'Clocked Out',
      notClockedIn: 'Not Clocked In',
      workingTime: 'Working Time',
      breakTime: 'Break Time',
      expectedHours: 'Expected Hours',
      overtime: 'Overtime'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const getStatusConfig = () => {
    if (isClocked) {
      return {
        label: t?.clockedIn,
        color: 'text-success',
        bgColor: 'bg-success/10',
        icon: 'CheckCircle'
      };
    } else if (clockInTime) {
      return {
        label: t?.clockedOut,
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        icon: 'Clock'
      };
    } else {
      return {
        label: t?.notClockedIn,
        color: 'text-muted-foreground',
        bgColor: 'bg-muted',
        icon: 'Circle'
      };
    }
  };

  const statusConfig = getStatusConfig();

  const formatTime = (timeString) => {
    if (!timeString) return '--:--';
    return timeString;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today?.toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', options);
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-elevation-2 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Calendar" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{t?.todaySummary}</h3>
            <p className="text-sm text-muted-foreground">{getCurrentDate()}</p>
          </div>
        </div>
      </div>
      {/* Status Badge */}
      <div className="mb-6">
        <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${statusConfig?.color} ${statusConfig?.bgColor}`}>
          <Icon name={statusConfig?.icon} size={16} />
          <span>{statusConfig?.label}</span>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="space-y-4">
        {/* Clock In Time */}
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="LogIn" size={18} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-foreground">{t?.clockInTime}</span>
          </div>
          <span className="text-sm font-mono text-foreground">
            {formatTime(clockInTime)}
          </span>
        </div>

        {/* Total Hours */}
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={18} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-foreground">{t?.totalHours}</span>
          </div>
          <span className="text-sm font-mono text-foreground font-semibold">
            {totalHours}
          </span>
        </div>

        {/* Expected Hours */}
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Target" size={18} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-foreground">{t?.expectedHours}</span>
          </div>
          <span className="text-sm font-mono text-muted-foreground">
            8h 00m
          </span>
        </div>

        {/* Break Time */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <Icon name="Coffee" size={18} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-foreground">{t?.breakTime}</span>
          </div>
          <span className="text-sm font-mono text-muted-foreground">
            0h 30m
          </span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">Progression Journalière</span>
          <span className="text-xs font-medium text-foreground">
            {totalHours} / 8h 00m
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-smooth" 
            style={{ width: `${Math.min((parseFloat(totalHours) / 8) * 100, 100)}%` }}
          />
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center space-x-2 py-2 px-3 bg-muted/50 hover:bg-muted rounded-lg transition-smooth text-sm">
            <Icon name="History" size={16} color="var(--color-muted-foreground)" />
            <span className="text-muted-foreground">Historique</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-2 px-3 bg-muted/50 hover:bg-muted rounded-lg transition-smooth text-sm">
            <Icon name="Download" size={16} color="var(--color-muted-foreground)" />
            <span className="text-muted-foreground">Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodaySummaryCard;