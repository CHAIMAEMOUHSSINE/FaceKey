import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const AttendanceCharts = ({ 
  reportData = null,
  currentLanguage = 'fr'
}) => {
  const translations = {
    fr: {
      attendanceAnalytics: 'Analyses de Présence',
      departmentComparison: 'Comparaison par Département',
      attendanceStatus: 'Statut de Présence',
      weeklyTrends: 'Tendances Hebdomadaires',
      present: 'Présent',
      absent: 'Absent',
      late: 'Retard',
      earlyLeave: 'Départ anticipé',
      employees: 'Employés',
      percentage: 'Pourcentage',
      day: 'Jour',
      attendanceRate: 'Taux de présence'
    },
    en: {
      attendanceAnalytics: 'Attendance Analytics',
      departmentComparison: 'Department Comparison',
      attendanceStatus: 'Attendance Status',
      weeklyTrends: 'Weekly Trends',
      present: 'Present',
      absent: 'Absent',
      late: 'Late',
      earlyLeave: 'Early Leave',
      employees: 'Employees',
      percentage: 'Percentage',
      day: 'Day',
      attendanceRate: 'Attendance Rate'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  // Mock chart data
  const departmentData = [
    { department: 'Production', present: 45, absent: 5, late: 8, total: 58 },
    { department: 'Administration', present: 22, absent: 2, late: 3, total: 27 },
    { department: 'Maintenance', present: 18, absent: 1, late: 2, total: 21 },
    { department: 'Qualité', present: 15, absent: 3, late: 1, total: 19 },
    { department: 'Logistique', present: 12, absent: 1, late: 2, total: 15 },
    { department: 'RH', present: 8, absent: 0, late: 1, total: 9 }
  ];

  const statusData = [
    { name: t?.present, value: 120, color: 'var(--color-success)' },
    { name: t?.late, value: 17, color: 'var(--color-warning)' },
    { name: t?.absent, value: 12, color: 'var(--color-destructive)' },
    { name: t?.earlyLeave, value: 8, color: 'var(--color-secondary)' }
  ];

  const weeklyTrendData = [
    { day: 'Lun', attendanceRate: 95 },
    { day: 'Mar', attendanceRate: 92 },
    { day: 'Mer', attendanceRate: 88 },
    { day: 'Jeu', attendanceRate: 90 },
    { day: 'Ven', attendanceRate: 85 },
    { day: 'Sam', attendanceRate: 78 },
    { day: 'Dim', attendanceRate: 82 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-3">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              <span style={{ color: entry?.color }}>{entry?.name}</span>: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-3">
          <p className="text-sm font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">
            {data?.value} {t?.employees} ({((data?.value / statusData?.reduce((sum, item) => sum + item?.value, 0)) * 100)?.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2 mb-6">
          <Icon name="BarChart3" size={20} color="var(--color-primary)" />
          <span>{t?.attendanceAnalytics}</span>
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Department Comparison Chart */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-foreground">{t?.departmentComparison}</h3>
            <div className="w-full h-80" aria-label="Department Attendance Comparison">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="department" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="present" 
                    name={t?.present}
                    fill="var(--color-success)" 
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar 
                    dataKey="late" 
                    name={t?.late}
                    fill="var(--color-warning)" 
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar 
                    dataKey="absent" 
                    name={t?.absent}
                    fill="var(--color-destructive)" 
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Attendance Status Pie Chart */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-foreground">{t?.attendanceStatus}</h3>
            <div className="w-full h-80" aria-label="Attendance Status Distribution">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Weekly Trends Line Chart */}
        <div className="mt-8 space-y-4">
          <h3 className="text-md font-medium text-foreground">{t?.weeklyTrends}</h3>
          <div className="w-full h-64" aria-label="Weekly Attendance Trends">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="day" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="attendanceRate" 
                  name={t?.attendanceRate}
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCharts;