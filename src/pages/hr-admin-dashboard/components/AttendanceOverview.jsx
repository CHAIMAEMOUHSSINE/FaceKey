import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceOverview = ({ currentLanguage = 'fr' }) => {
  const [viewMode, setViewMode] = useState('department');

  const translations = {
    fr: {
      attendanceOverview: 'Aperçu des Présences',
      byDepartment: 'Par Département',
      byTime: 'Par Heure',
      present: 'Présent',
      absent: 'Absent',
      late: 'En Retard',
      employees: 'employés'
    },
    en: {
      attendanceOverview: 'Attendance Overview',
      byDepartment: 'By Department',
      byTime: 'By Time',
      present: 'Present',
      absent: 'Absent',
      late: 'Late',
      employees: 'employees'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const departmentData = [
    { name: 'Production', present: 45, absent: 5, late: 3, total: 53 },
    { name: 'Administration', present: 28, absent: 2, late: 1, total: 31 },
    { name: 'Maintenance', present: 18, absent: 3, late: 2, total: 23 },
    { name: 'Qualité', present: 15, absent: 1, late: 0, total: 16 },
    { name: 'Logistique', present: 22, absent: 4, late: 1, total: 27 }
  ];

  const timeData = [
    { time: '07:00', clockIns: 12 },
    { time: '07:30', clockIns: 28 },
    { time: '08:00', clockIns: 45 },
    { time: '08:30', clockIns: 23 },
    { time: '09:00', clockIns: 8 },
    { time: '09:30', clockIns: 4 }
  ];

  const statusData = [
    { name: t?.present, value: 128, color: 'var(--color-success)' },
    { name: t?.absent, value: 15, color: 'var(--color-destructive)' },
    { name: t?.late, value: 7, color: 'var(--color-warning)' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-popover-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey}: ${entry?.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{t?.attendanceOverview}</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'department' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('department')}
            >
              <Icon name="Building2" size={16} />
              <span className="hidden sm:inline ml-2">{t?.byDepartment}</span>
            </Button>
            <Button
              variant={viewMode === 'time' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('time')}
            >
              <Icon name="Clock" size={16} />
              <span className="hidden sm:inline ml-2">{t?.byTime}</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {viewMode === 'department' ? (
                  <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--color-muted-foreground)"
                      fontSize={12}
                    />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="present" fill="var(--color-success)" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="late" fill="var(--color-warning)" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="absent" fill="var(--color-destructive)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                ) : (
                  <BarChart data={timeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="time" 
                      stroke="var(--color-muted-foreground)"
                      fontSize={12}
                    />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="clockIns" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Pie Chart */}
          <div className="flex flex-col">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Statut Aujourd'hui</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="space-y-2 mt-4">
              {statusData?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item?.color }}
                    />
                    <span className="text-sm text-foreground">{item?.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {item?.value} {t?.employees}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;