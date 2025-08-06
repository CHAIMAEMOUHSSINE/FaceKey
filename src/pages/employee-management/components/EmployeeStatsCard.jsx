import React from 'react';
import Icon from '../../../components/AppIcon';

const EmployeeStatsCard = ({ 
  employees = [], 
  currentLanguage = 'fr' 
}) => {
  const translations = {
    fr: {
      totalEmployees: 'Total Employés',
      enrolledEmployees: 'Employés Inscrits',
      activeToday: 'Actifs Aujourd\'hui',
      pendingEnrollment: 'En Attente d\'Inscription',
      enrollmentRate: 'Taux d\'Inscription',
      activeRate: 'Taux d\'Activité'
    },
    en: {
      totalEmployees: 'Total Employees',
      enrolledEmployees: 'Enrolled Employees',
      activeToday: 'Active Today',
      pendingEnrollment: 'Pending Enrollment',
      enrollmentRate: 'Enrollment Rate',
      activeRate: 'Activity Rate'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const stats = {
    total: employees?.length,
    enrolled: employees?.filter(emp => emp?.enrollmentStatus === 'enrolled')?.length,
    active: employees?.filter(emp => emp?.isActive)?.length,
    pending: employees?.filter(emp => emp?.enrollmentStatus === 'pending')?.length
  };

  const enrollmentRate = stats?.total > 0 ? Math.round((stats?.enrolled / stats?.total) * 100) : 0;
  const activeRate = stats?.total > 0 ? Math.round((stats?.active / stats?.total) * 100) : 0;

  const statCards = [
    {
      title: t?.totalEmployees,
      value: stats?.total,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: t?.enrolledEmployees,
      value: stats?.enrolled,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10',
      subtitle: `${enrollmentRate}% ${t?.enrollmentRate}`
    },
    {
      title: t?.activeToday,
      value: stats?.active,
      icon: 'Activity',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      subtitle: `${activeRate}% ${t?.activeRate}`
    },
    {
      title: t?.pendingEnrollment,
      value: stats?.pending,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat?.title}
              </p>
              <p className="text-2xl font-bold text-foreground mb-1">
                {stat?.value?.toLocaleString()}
              </p>
              {stat?.subtitle && (
                <p className="text-xs text-muted-foreground">
                  {stat?.subtitle}
                </p>
              )}
            </div>
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${stat?.bgColor}`}>
              <Icon 
                name={stat?.icon} 
                size={24} 
                color={`var(--color-${stat?.color?.replace('text-', '')})`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeStatsCard;