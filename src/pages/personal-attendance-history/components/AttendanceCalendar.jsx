import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceCalendar = ({ 
  attendanceData = [],
  selectedDate,
  onDateSelect,
  currentLanguage = 'fr'
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const translations = {
    fr: {
      months: [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ],
      days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      today: 'Aujourd\'hui',
      present: 'Présent',
      absent: 'Absent',
      late: 'En retard',
      holiday: 'Congé'
    },
    en: {
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      today: 'Today',
      present: 'Present',
      absent: 'Absent',
      late: 'Late',
      holiday: 'Holiday'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const getAttendanceForDate = (date) => {
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return attendanceData?.find(record => record?.date === dateStr);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-success text-success-foreground';
      case 'absent':
        return 'bg-destructive text-destructive-foreground';
      case 'late':
        return 'bg-warning text-warning-foreground';
      case 'holiday':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth?.setMonth(prev?.getMonth() + direction);
      return newMonth;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date && 
           date?.getDate() === today?.getDate() &&
           date?.getMonth() === today?.getMonth() &&
           date?.getFullYear() === today?.getFullYear();
  };

  const isSelected = (date) => {
    return selectedDate && date &&
           date?.getDate() === selectedDate?.getDate() &&
           date?.getMonth() === selectedDate?.getMonth() &&
           date?.getFullYear() === selectedDate?.getFullYear();
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {t?.months?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(-1)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="ChevronLeft" size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentMonth(new Date())}
            className="text-muted-foreground hover:text-foreground px-3"
          >
            {t?.today}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(1)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="ChevronRight" size={18} />
          </Button>
        </div>
      </div>
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {t?.days?.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days?.map((date, index) => {
          if (!date) {
            return <div key={index} className="p-2 h-12" />;
          }

          const attendance = getAttendanceForDate(date);
          const status = attendance?.status || 'no-data';

          return (
            <button
              key={date?.toISOString()}
              onClick={() => onDateSelect(date)}
              className={`relative p-2 h-12 text-sm rounded-lg transition-smooth hover:bg-muted ${
                isSelected(date) ? 'ring-2 ring-primary' : ''
              } ${isToday(date) ? 'font-semibold' : ''}`}
            >
              <span className={`${isToday(date) ? 'text-primary' : 'text-foreground'}`}>
                {date?.getDate()}
              </span>
              {/* Status Indicator */}
              {attendance && (
                <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${getStatusColor(status)}`} />
              )}
            </button>
          );
        })}
      </div>
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-muted-foreground">{t?.present}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-muted-foreground">{t?.late}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-muted-foreground">{t?.absent}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-muted-foreground">{t?.holiday}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;