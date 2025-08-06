import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportPreview = ({ 
  reportData = null,
  isLoading = false,
  currentLanguage = 'fr'
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const translations = {
    fr: {
      reportPreview: 'Aperçu du rapport',
      noDataAvailable: 'Aucune donnée disponible',
      generateReportFirst: 'Veuillez générer un rapport pour voir les données',
      employee: 'Employé',
      department: 'Département',
      clockIn: 'Arrivée',
      clockOut: 'Départ',
      totalHours: 'Heures totales',
      overtime: 'Heures sup.',
      status: 'Statut',
      present: 'Présent',
      absent: 'Absent',
      late: 'Retard',
      earlyLeave: 'Départ anticipé',
      loading: 'Génération du rapport...',
      sortBy: 'Trier par'
    },
    en: {
      reportPreview: 'Report Preview',
      noDataAvailable: 'No data available',
      generateReportFirst: 'Please generate a report to view data',
      employee: 'Employee',
      department: 'Department',
      clockIn: 'Clock In',
      clockOut: 'Clock Out',
      totalHours: 'Total Hours',
      overtime: 'Overtime',
      status: 'Status',
      present: 'Present',
      absent: 'Absent',
      late: 'Late',
      earlyLeave: 'Early Leave',
      loading: 'Generating report...',
      sortBy: 'Sort by'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  // Mock report data
  const mockReportData = [
    {
      id: 1,
      employee: 'Jean Dupont',
      department: 'Production',
      clockIn: '08:00',
      clockOut: '17:30',
      totalHours: '8h30',
      overtime: '0h30',
      status: 'present',
      date: '06/08/2025'
    },
    {
      id: 2,
      employee: 'Marie Martin',
      department: 'Administration',
      clockIn: '08:15',
      clockOut: '17:00',
      totalHours: '8h45',
      overtime: '0h45',
      status: 'late',
      date: '06/08/2025'
    },
    {
      id: 3,
      employee: 'Pierre Bernard',
      department: 'Maintenance',
      clockIn: '07:45',
      clockOut: '16:45',
      totalHours: '9h00',
      overtime: '1h00',
      status: 'present',
      date: '06/08/2025'
    },
    {
      id: 4,
      employee: 'Sophie Dubois',
      department: 'Qualité',
      clockIn: '--',
      clockOut: '--',
      totalHours: '0h00',
      overtime: '0h00',
      status: 'absent',
      date: '06/08/2025'
    },
    {
      id: 5,
      employee: 'Luc Moreau',
      department: 'Logistique',
      clockIn: '08:00',
      clockOut: '15:30',
      totalHours: '7h30',
      overtime: '0h00',
      status: 'earlyLeave',
      date: '06/08/2025'
    }
  ];

  const displayData = reportData || mockReportData;

  const getStatusBadge = (status) => {
    const statusConfig = {
      present: { color: 'bg-success text-success-foreground', label: t?.present },
      absent: { color: 'bg-destructive text-destructive-foreground', label: t?.absent },
      late: { color: 'bg-warning text-warning-foreground', label: t?.late },
      earlyLeave: { color: 'bg-secondary text-secondary-foreground', label: t?.earlyLeave }
    };

    const config = statusConfig?.[status] || statusConfig?.present;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} color="var(--color-muted-foreground)" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} color="var(--color-primary)" />
      : <Icon name="ArrowDown" size={14} color="var(--color-primary)" />;
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig?.key) return displayData;

    return [...displayData]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [displayData, sortConfig]);

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Icon name="Loader2" size={32} color="var(--color-primary)" className="animate-spin" />
          <p className="text-muted-foreground">{t?.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="FileText" size={20} color="var(--color-primary)" />
          <span>{t?.reportPreview}</span>
        </h2>
      </div>
      {!reportData && !isLoading ? (
        <div className="p-8 text-center">
          <Icon name="FileX" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">{t?.noDataAvailable}</h3>
          <p className="text-muted-foreground">{t?.generateReportFirst}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('employee')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground p-0 h-auto"
                  >
                    <span>{t?.employee}</span>
                    {getSortIcon('employee')}
                  </Button>
                </th>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('department')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground p-0 h-auto"
                  >
                    <span>{t?.department}</span>
                    {getSortIcon('department')}
                  </Button>
                </th>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('clockIn')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground p-0 h-auto"
                  >
                    <span>{t?.clockIn}</span>
                    {getSortIcon('clockIn')}
                  </Button>
                </th>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('clockOut')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground p-0 h-auto"
                  >
                    <span>{t?.clockOut}</span>
                    {getSortIcon('clockOut')}
                  </Button>
                </th>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('totalHours')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground p-0 h-auto"
                  >
                    <span>{t?.totalHours}</span>
                    {getSortIcon('totalHours')}
                  </Button>
                </th>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('overtime')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground p-0 h-auto"
                  >
                    <span>{t?.overtime}</span>
                    {getSortIcon('overtime')}
                  </Button>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-sm font-medium text-foreground">{t?.status}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedData?.map((row) => (
                <tr key={row?.id} className="hover:bg-muted/50 transition-smooth">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} color="var(--color-primary)" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{row?.employee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{row?.department}</td>
                  <td className="px-6 py-4 text-sm text-foreground font-data">{row?.clockIn}</td>
                  <td className="px-6 py-4 text-sm text-foreground font-data">{row?.clockOut}</td>
                  <td className="px-6 py-4 text-sm text-foreground font-data">{row?.totalHours}</td>
                  <td className="px-6 py-4 text-sm text-foreground font-data">{row?.overtime}</td>
                  <td className="px-6 py-4">{getStatusBadge(row?.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportPreview;