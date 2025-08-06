import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AttendanceFilters = ({ 
  onFiltersChange,
  currentLanguage = 'fr'
}) => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: 'all',
    searchTerm: ''
  });

  const translations = {
    fr: {
      filters: 'Filtres',
      dateRange: 'Période',
      startDate: 'Date de début',
      endDate: 'Date de fin',
      status: 'Statut',
      search: 'Rechercher',
      searchPlaceholder: 'Rechercher par date ou statut...',
      apply: 'Appliquer',
      reset: 'Réinitialiser',
      all: 'Tous',
      present: 'Présent',
      absent: 'Absent',
      late: 'En retard',
      holiday: 'Congé',
      thisWeek: 'Cette semaine',
      thisMonth: 'Ce mois',
      lastMonth: 'Mois dernier',
      last3Months: '3 derniers mois'
    },
    en: {
      filters: 'Filters',
      dateRange: 'Date Range',
      startDate: 'Start Date',
      endDate: 'End Date',
      status: 'Status',
      search: 'Search',
      searchPlaceholder: 'Search by date or status...',
      apply: 'Apply',
      reset: 'Reset',
      all: 'All',
      present: 'Present',
      absent: 'Absent',
      late: 'Late',
      holiday: 'Holiday',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      lastMonth: 'Last Month',
      last3Months: 'Last 3 Months'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const statusOptions = [
    { value: 'all', label: t?.all },
    { value: 'present', label: t?.present },
    { value: 'absent', label: t?.absent },
    { value: 'late', label: t?.late },
    { value: 'holiday', label: t?.holiday }
  ];

  const quickDateRanges = [
    { 
      label: t?.thisWeek, 
      value: 'thisWeek',
      getRange: () => {
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
        return {
          startDate: startOfWeek?.toISOString()?.split('T')?.[0],
          endDate: endOfWeek?.toISOString()?.split('T')?.[0]
        };
      }
    },
    { 
      label: t?.thisMonth, 
      value: 'thisMonth',
      getRange: () => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return {
          startDate: startOfMonth?.toISOString()?.split('T')?.[0],
          endDate: endOfMonth?.toISOString()?.split('T')?.[0]
        };
      }
    },
    { 
      label: t?.lastMonth, 
      value: 'lastMonth',
      getRange: () => {
        const now = new Date();
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        return {
          startDate: startOfLastMonth?.toISOString()?.split('T')?.[0],
          endDate: endOfLastMonth?.toISOString()?.split('T')?.[0]
        };
      }
    },
    { 
      label: t?.last3Months, 
      value: 'last3Months',
      getRange: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return {
          startDate: start?.toISOString()?.split('T')?.[0],
          endDate: end?.toISOString()?.split('T')?.[0]
        };
      }
    }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleQuickDateRange = (range) => {
    const dateRange = range?.getRange();
    const newFilters = { 
      ...filters, 
      startDate: dateRange?.startDate,
      endDate: dateRange?.endDate 
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      startDate: '',
      endDate: '',
      status: 'all',
      searchTerm: ''
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>{t?.filters}</span>
        </h3>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetFilters}
            className="text-muted-foreground"
          >
            <Icon name="RotateCcw" size={16} />
            <span className="hidden sm:inline ml-2">{t?.reset}</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleApplyFilters}
          >
            <Icon name="Search" size={16} />
            <span className="hidden sm:inline ml-2">{t?.apply}</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Date Range */}
        <div className="space-y-2">
          <Input
            label={t?.startDate}
            type="date"
            value={filters?.startDate}
            onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
          />
        </div>

        <div className="space-y-2">
          <Input
            label={t?.endDate}
            type="date"
            value={filters?.endDate}
            onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Select
            label={t?.status}
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />
        </div>

        {/* Search */}
        <div className="space-y-2">
          <Input
            label={t?.search}
            type="search"
            placeholder={t?.searchPlaceholder}
            value={filters?.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e?.target?.value)}
          />
        </div>
      </div>
      {/* Quick Date Range Buttons */}
      <div className="flex flex-wrap gap-2">
        {quickDateRanges?.map((range) => (
          <Button
            key={range?.value}
            variant="ghost"
            size="sm"
            onClick={() => handleQuickDateRange(range)}
            className="text-muted-foreground hover:text-foreground"
          >
            {range?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AttendanceFilters;