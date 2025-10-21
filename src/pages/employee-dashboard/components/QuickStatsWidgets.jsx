import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsWidgets = ({ 
  currentLanguage = 'fr',
    employeeDashboard,
  weeklyHours ,
  monthlyAttendance = 95,
  upcomingSchedule = []
}) => {
  const translations = {
    fr: {
      weeklyHours: 'Heures Hebdomadaires',
      monthlyAttendance: 'Assiduité Mensuelle',
      upcomingSchedule: 'Horaires à Venir',
      target: 'Objectif',
      completed: 'Complété',
      remaining: 'Restant',
      excellent: 'Excellent',
      good: 'Bon',
      needsImprovement: 'À Améliorer',
      noSchedule: 'Aucun horaire programmé',
      today: 'Aujourd\'hui',
      tomorrow: 'Demain',
      thisWeek: 'Cette Semaine'
    },
    en: {
      weeklyHours: 'Weekly Hours',
      monthlyAttendance: 'Monthly Attendance',
      upcomingSchedule: 'Upcoming Schedule',
      target: 'Target',
      completed: 'Completed',
      remaining: 'Remaining',
      excellent: 'Excellent',
      good: 'Good',
      needsImprovement: 'Needs Improvement',
      noSchedule: 'No scheduled hours',
      today: 'Today',
      tomorrow: 'Tomorrow',
      thisWeek: 'This Week'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  // Mock upcoming schedule if none provided
  const mockSchedule = [
    {
      id: 1,
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      startTime: '09:00',
      endTime: '17:00',
      type: 'regular',
      location: 'Bureau Principal'
    },
    {
      id: 2,
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
      startTime: '08:30',
      endTime: '16:30',
      type: 'early',
      location: 'Site Chantier A'
    }
  ];

  const displaySchedule = upcomingSchedule?.length > 0 ? upcomingSchedule : mockSchedule;

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 95) return { label: t?.excellent, color: 'text-success', bgColor: 'bg-success/10' };
    if (percentage >= 85) return { label: t?.good, color: 'text-primary', bgColor: 'bg-primary/10' };
    return { label: t?.needsImprovement, color: 'text-warning', bgColor: 'bg-warning/10' };
  };

  const attendanceStatus = getAttendanceStatus(monthlyAttendance);

  const formatScheduleDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);

    if (date?.toDateString() === today?.toDateString()) {
      return t?.today;
    } else if (date?.toDateString() === tomorrow?.toDateString()) {
      return t?.tomorrow;
    } else {
      return date?.toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const calculateWeeklyProgress = () => {
    const hoursWorked = parseFloat(weeklyHours?.replace('h', '')?.replace('m', '')?.split(' ')?.[0]) || 0;
    const targetHours = 40;
    return Math.min((hoursWorked / targetHours) * 100, 100);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weekly Hours Widget */}
      <div className="bg-card border border-border rounded-xl shadow-elevation-2 p-6" style={{
        width:'100%'
      }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Clock" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">{t?.weeklyHours}</h4>
              <p className="text-2xl font-bold text-foreground">{weeklyHours}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t?.target}: 40h</span>
            <span className="text-foreground font-medium">{calculateWeeklyProgress()?.toFixed(0)}%</span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-smooth" 
              style={{ width: `${calculateWeeklyProgress()}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{t?.remaining}: {employeeDashboard?.restant ||'0'}h</span>
            <span>5 jours</span>
          </div>
        </div>
      </div>
      {/* Monthly Attendance Widget */}
      <div className="bg-card border border-border rounded-xl shadow-elevation-2 p-6" style={{
        width:'100%'
      }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
              <Icon name="Calendar" size={24} color="var(--color-accent)" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">{t?.monthlyAttendance}</h4>
              <p className="text-2xl font-bold text-foreground">{monthlyAttendance}%</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${attendanceStatus?.color} ${attendanceStatus?.bgColor}`}>
            <Icon name="TrendingUp" size={14} />
            <span>{attendanceStatus?.label}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center pt-2">
            <div>
              <p className="text-lg font-semibold text-foreground">22</p>
              <p className="text-xs text-muted-foreground">Jours Présents</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">1</p>
              <p className="text-xs text-muted-foreground">Jours Absents</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default QuickStatsWidgets;