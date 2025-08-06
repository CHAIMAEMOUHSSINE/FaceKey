import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AttendanceCharts = ({ 
  weeklyData = [],
  monthlyData = [],
  punctualityData = [],
  currentLanguage = 'fr'
}) => {
  const translations = {
    fr: {
      weeklyHours: 'Heures hebdomadaires',
      monthlyTrends: 'Tendances mensuelles',
      punctualityStats: 'Statistiques de ponctualité',
      hours: 'Heures',
      week: 'Semaine',
      month: 'Mois',
      present: 'Présent',
      late: 'En retard',
      absent: 'Absent',
      onTime: 'À l\'heure',
      averageHours: 'Heures moyennes',
      totalDays: 'Jours totaux'
    },
    en: {
      weeklyHours: 'Weekly Hours',
      monthlyTrends: 'Monthly Trends',
      punctualityStats: 'Punctuality Statistics',
      hours: 'Hours',
      week: 'Week',
      month: 'Month',
      present: 'Present',
      late: 'Late',
      absent: 'Absent',
      onTime: 'On Time',
      averageHours: 'Average Hours',
      totalDays: 'Total Days'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const COLORS = {
    present: '#10B981',
    late: '#F59E0B',
    absent: '#EF4444',
    onTime: '#059669'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-3">
          <p className="text-foreground font-medium">{`${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}${entry?.name?.toLowerCase()?.includes('hour') ? 'h' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-3">
          <p className="text-foreground font-medium">{data?.name}</p>
          <p className="text-sm text-muted-foreground">
            {`${data?.value} jours (${((data?.value / punctualityData?.reduce((sum, item) => sum + item?.value, 0)) * 100)?.toFixed(1)}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Weekly Hours Chart */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">{t?.weeklyHours}</h3>
        </div>
        
        <div className="h-64" aria-label="Weekly Hours Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="week" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: t?.hours, angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="hours" 
                fill="var(--color-primary)" 
                radius={[4, 4, 0, 0]}
                name={t?.hours}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="TrendingUp" size={20} color="var(--color-accent)" />
            <h3 className="text-lg font-semibold text-foreground">{t?.monthlyTrends}</h3>
          </div>
          
          <div className="h-64" aria-label="Monthly Trends Line Chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="averageHours" 
                  stroke="var(--color-accent)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                  name={t?.averageHours}
                />
                <Line 
                  type="monotone" 
                  dataKey="totalDays" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 3 }}
                  name={t?.totalDays}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Punctuality Statistics */}
        <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Clock" size={20} color="var(--color-warning)" />
            <h3 className="text-lg font-semibold text-foreground">{t?.punctualityStats}</h3>
          </div>
          
          <div className="h-64" aria-label="Punctuality Statistics Pie Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={punctualityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {punctualityData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[entry?.status] || '#64748B'} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {punctualityData?.map((entry, index) => (
              <div key={entry?.status} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS?.[entry?.status] || '#64748B' }}
                />
                <span className="text-sm text-muted-foreground">
                  {entry?.name} ({entry?.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCharts;