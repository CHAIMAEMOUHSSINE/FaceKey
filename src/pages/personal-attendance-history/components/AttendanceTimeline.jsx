import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceTimeline = ({ 
  attendanceRecords = [],
  currentLanguage = 'fr'
}) => {
  const translations = {
    fr: {
      clockIn: 'Arrivée',
      clockOut: 'Départ',
      totalHours: 'Heures totales',
      breakTime: 'Pause',
      overtime: 'Heures sup.',
      status: 'Statut',
      present: 'Présent',
      absent: 'Absent',
      late: 'En retard',
      holiday: 'Congé',
      noRecords: 'Aucun enregistrement trouvé',
      hours: 'h',
      minutes: 'min'
    },
    en: {
      clockIn: 'Clock In',
      clockOut: 'Clock Out',
      totalHours: 'Total Hours',
      breakTime: 'Break',
      overtime: 'Overtime',
      status: 'Status',
      present: 'Present',
      absent: 'Absent',
      late: 'Late',
      holiday: 'Holiday',
      noRecords: 'No records found',
      hours: 'h',
      minutes: 'm'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const getStatusConfig = (status) => {
    switch (status) {
      case 'present':
        return {
          label: t?.present,
          color: 'text-success',
          bgColor: 'bg-success/10',
          icon: 'CheckCircle'
        };
      case 'absent':
        return {
          label: t?.absent,
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          icon: 'XCircle'
        };
      case 'late':
        return {
          label: t?.late,
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          icon: 'Clock'
        };
      case 'holiday':
        return {
          label: t?.holiday,
          color: 'text-secondary',
          bgColor: 'bg-secondary/10',
          icon: 'Calendar'
        };
      default:
        return {
          label: status,
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          icon: 'Circle'
        };
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '--:--';
    return timeString?.substring(0, 5);
  };

  const formatDuration = (minutes) => {
    if (!minutes) return `0${t?.hours} 0${t?.minutes}`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}${t?.hours} ${mins}${t?.minutes}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date?.toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', options);
  };

  if (attendanceRecords?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-8">
        <div className="text-center">
          <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            {t?.noRecords}
          </h3>
          <p className="text-muted-foreground">
            Sélectionnez une période pour voir vos enregistrements de présence
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          Historique détaillé
        </h3>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {attendanceRecords?.map((record) => {
          const statusConfig = getStatusConfig(record?.status);
          
          return (
            <div key={record?.id} className="p-6 hover:bg-muted/50 transition-smooth">
              {/* Date Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${statusConfig?.bgColor}`}>
                    <Icon 
                      name={statusConfig?.icon} 
                      size={20} 
                      color={`var(--color-${statusConfig?.color?.replace('text-', '')})`}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {formatDate(record?.date)}
                    </h4>
                    <span className={`text-sm font-medium ${statusConfig?.color}`}>
                      {statusConfig?.label}
                    </span>
                  </div>
                </div>
                
                {record?.totalHours && (
                  <div className="text-right">
                    <div className="text-lg font-semibold text-foreground">
                      {formatDuration(record?.totalHours)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t?.totalHours}
                    </div>
                  </div>
                )}
              </div>
              {/* Time Details */}
              {record?.status !== 'absent' && record?.status !== 'holiday' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="LogIn" size={16} color="var(--color-success)" />
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {formatTime(record?.clockIn)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t?.clockIn}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Icon name="LogOut" size={16} color="var(--color-destructive)" />
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {formatTime(record?.clockOut)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t?.clockOut}
                      </div>
                    </div>
                  </div>

                  {record?.breakTime && (
                    <div className="flex items-center space-x-2">
                      <Icon name="Coffee" size={16} color="var(--color-warning)" />
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {formatDuration(record?.breakTime)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t?.breakTime}
                        </div>
                      </div>
                    </div>
                  )}

                  {record?.overtime > 0 && (
                    <div className="flex items-center space-x-2">
                      <Icon name="TrendingUp" size={16} color="var(--color-accent)" />
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {formatDuration(record?.overtime)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t?.overtime}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceTimeline;