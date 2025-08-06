import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({ 
  currentLanguage = 'fr',
  onFiltersChange = () => {}
}) => {
  const [filters, setFilters] = useState({
    dateRange: 'today',
    department: 'all',
    status: 'all',
    searchTerm: ''
  });

  const translations = {
    fr: {
      filters: 'Filtres',
      dateRange: 'Période',
      department: 'Département',
      status: 'Statut',
      search: 'Rechercher employé...',
      today: 'Aujourd\'hui',
      thisWeek: 'Cette Semaine',
      thisMonth: 'Ce Mois',
      custom: 'Personnalisé',
      allDepartments: 'Tous les Départements',
      production: 'Production',
      administration: 'Administration',
      maintenance: 'Maintenance',
      quality: 'Qualité',
      logistics: 'Logistique',
      allStatuses: 'Tous les Statuts',
      present: 'Présent',
      absent: 'Absent',
      late: 'En Retard',
      reset: 'Réinitialiser',
      apply: 'Appliquer'
    },
    en: {
      filters: 'Filters',
      dateRange: 'Date Range',
      department: 'Department',
      status: 'Status',
      search: 'Search employee...',
      today: 'Today',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      custom: 'Custom',
      allDepartments: 'All Departments',
      production: 'Production',
      administration: 'Administration',
      maintenance: 'Maintenance',
      quality: 'Quality',
      logistics: 'Logistics',
      allStatuses: 'All Statuses',
      present: 'Present',
      absent: 'Absent',
      late: 'Late',
      reset: 'Reset',
      apply: 'Apply'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const dateRangeOptions = [
    { value: 'today', label: t?.today },
    { value: 'thisWeek', label: t?.thisWeek },
    { value: 'thisMonth', label: t?.thisMonth },
    { value: 'custom', label: t?.custom }
  ];

  const departmentOptions = [
    { value: 'all', label: t?.allDepartments },
    { value: 'production', label: t?.production },
    { value: 'administration', label: t?.administration },
    { value: 'maintenance', label: t?.maintenance },
    { value: 'quality', label: t?.quality },
    { value: 'logistics', label: t?.logistics }
  ];

  const statusOptions = [
    { value: 'all', label: t?.allStatuses },
    { value: 'present', label: t?.present },
    { value: 'absent', label: t?.absent },
    { value: 'late', label: t?.late }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      dateRange: 'today',
      department: 'all',
      status: 'all',
      searchTerm: ''
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const hasActiveFilters = () => {
    return filters?.dateRange !== 'today' || 
           filters?.department !== 'all' || 
           filters?.status !== 'all' || 
           filters?.searchTerm !== '';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">{t?.filters}</h3>
        </div>
        
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="RotateCcw" size={16} />
            <span className="ml-2">{t?.reset}</span>
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder={t?.search}
            value={filters?.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Date Range Select */}
        <Select
          label={t?.dateRange}
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />

        {/* Department Select */}
        <Select
          label={t?.department}
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => handleFilterChange('department', value)}
        />
      </div>
      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Status Select */}
        <Select
          label={t?.status}
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        {/* Custom Date Range (shown when custom is selected) */}
        {filters?.dateRange === 'custom' && (
          <>
            <Input
              type="date"
              label="Date de Début"
              onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
            />
            <Input
              type="date"
              label="Date de Fin"
              onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
            />
          </>
        )}
      </div>
      {/* Active Filters Summary */}
      {hasActiveFilters() && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Filtres actifs:</span>
            {filters?.searchTerm && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                Recherche: "{filters?.searchTerm}"
              </span>
            )}
            {filters?.dateRange !== 'today' && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                {dateRangeOptions?.find(opt => opt?.value === filters?.dateRange)?.label}
              </span>
            )}
            {filters?.department !== 'all' && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                {departmentOptions?.find(opt => opt?.value === filters?.department)?.label}
              </span>
            )}
            {filters?.status !== 'all' && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;