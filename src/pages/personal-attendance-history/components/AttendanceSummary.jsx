import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceSummary = ({ 
  summaryData = {},
  currentLanguage = 'fr'
}) => {
  const translations = {
    fr: {
      monthlySummary: 'Résumé mensuel',
      totalDaysWorked: 'Jours travaillés',
      averageDailyHours: 'Heures moy./jour',
      punctualityRate: 'Taux de ponctualité',
      overtimeHours: 'Heures supplémentaires',
      totalHours: 'Heures totales',
      presentDays: 'Jours présents',
      lateDays: 'Jours en retard',
      absentDays: 'Jours absents',
      days: 'jours',
      hours: 'h',
      rate: '%'
    },
    en: {
      monthlySummary: 'Monthly Summary',
      totalDaysWorked: 'Days Worked',
      averageDailyHours: 'Avg. Daily Hours',
      punctualityRate: 'Punctuality Rate',
      overtimeHours: 'Overtime Hours',
      totalHours: 'Total Hours',
      presentDays: 'Present Days',
      lateDays: 'Late Days',
      absentDays: 'Absent Days',
      days: 'days',
      hours: 'h',
      rate: '%'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const {
    totalDaysWorked = 0,
    averageDailyHours = 0,
    punctualityRate = 0,
    overtimeHours = 0,
    totalHours = 0,
    presentDays = 0,
    lateDays = 0,
    absentDays = 0
  } = summaryData;

  const summaryCards = [
    {
      id: 'totalDays',
      title: t?.totalDaysWorked,
      value: totalDaysWorked,
      suffix: t?.days,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'totalHours',
      title: t?.totalHours,
      value: totalHours,
      suffix: t?.hours,
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'averageHours',
      title: t?.averageDailyHours,
      value: averageDailyHours?.toFixed(1),
      suffix: t?.hours,
      icon: 'BarChart3',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'punctuality',
      title: t?.punctualityRate,
      value: punctualityRate?.toFixed(1),
      suffix: t?.rate,
      icon: 'Target',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const detailCards = [
    {
      id: 'present',
      title: t?.presentDays,
      value: presentDays,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'late',
      title: t?.lateDays,
      value: lateDays,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'absent',
      title: t?.absentDays,
      value: absentDays,
      icon: 'XCircle',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      id: 'overtime',
      title: t?.overtimeHours,
      value: overtimeHours,
      suffix: t?.hours,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  const StatCard = ({ card, size = 'default' }) => (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {card?.title}
          </p>
          <div className="flex items-baseline space-x-1">
            <span className={`text-2xl font-bold ${card?.color}`}>
              {card?.value}
            </span>
            {card?.suffix && (
              <span className="text-sm text-muted-foreground">
                {card?.suffix}
              </span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${card?.bgColor}`}>
          <Icon 
            name={card?.icon} 
            size={size === 'large' ? 28 : 24} 
            color={`var(--color-${card?.color?.replace('text-', '')})`}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Icon name="BarChart3" size={24} color="var(--color-primary)" />
        <h2 className="text-xl font-semibold text-foreground">{t?.monthlySummary}</h2>
      </div>
      {/* Main Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards?.map((card) => (
          <StatCard key={card?.id} card={card} size="large" />
        ))}
      </div>
      {/* Detail Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {detailCards?.map((card) => (
          <StatCard key={card?.id} card={card} />
        ))}
      </div>
      {/* Progress Indicators */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Indicateurs de performance
        </h3>
        
        <div className="space-y-4">
          {/* Punctuality Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">{t?.punctualityRate}</span>
              <span className="text-sm text-muted-foreground">{punctualityRate?.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full transition-smooth" 
                style={{ width: `${Math.min(punctualityRate, 100)}%` }}
              />
            </div>
          </div>

          {/* Attendance Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Taux de présence</span>
              <span className="text-sm text-muted-foreground">
                {totalDaysWorked > 0 ? ((presentDays / totalDaysWorked) * 100)?.toFixed(1) : 0}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-smooth" 
                style={{ 
                  width: `${totalDaysWorked > 0 ? Math.min((presentDays / totalDaysWorked) * 100, 100) : 0}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;