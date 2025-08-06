import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DepartmentChart = ({ 
  employees = [], 
  currentLanguage = 'fr' 
}) => {
  const translations = {
    fr: {
      departmentDistribution: 'Répartition par Département',
      employees: 'employés'
    },
    en: {
      departmentDistribution: 'Department Distribution',
      employees: 'employees'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  // Calculate department distribution
  const departmentCounts = employees?.reduce((acc, employee) => {
    const dept = employee?.department;
    acc[dept] = (acc?.[dept] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(departmentCounts)?.map(([department, count]) => ({
    name: department,
    value: count,
    percentage: employees?.length > 0 ? Math.round((count / employees?.length) * 100) : 0
  }));

  const COLORS = [
    'var(--color-primary)',
    'var(--color-success)',
    'var(--color-warning)',
    'var(--color-accent)',
    'var(--color-secondary)',
    'var(--color-destructive)'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground">{data?.payload?.name}</p>
          <p className="text-sm text-muted-foreground">
            {data?.value} {t?.employees} ({data?.payload?.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {t?.departmentDistribution}
        </h3>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Aucune donnée disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {t?.departmentDistribution}
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData?.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS?.[index % COLORS?.length]} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="mt-4 space-y-2">
        {chartData?.map((item, index) => (
          <div key={item?.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
              />
              <span className="text-sm text-foreground">{item?.name}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {item?.value} ({item?.percentage}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentChart;