import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReportFilters = ({ 
  onGenerateReport = () => {},
  onClearFilters = () => {},
  isGenerating = false,
  currentLanguage = 'fr'
}) => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    departments: [],
    employees: [],
    reportType: 'daily-summary',
    includeOvertime: true,
    includeBreaks: false,
    customHours: false
  });

  const translations = {
    fr: {
      reportConfiguration: 'Configuration du Rapport',
      dateRange: 'Période',
      startDate: 'Date de début',
      endDate: 'Date de fin',
      departments: 'Départements',
      employees: 'Employés',
      reportType: 'Type de rapport',
      advancedOptions: 'Options avancées',
      includeOvertime: 'Inclure les heures supplémentaires',
      includeBreaks: 'Inclure les temps de pause',
      customWorkingHours: 'Heures de travail personnalisées',
      generateReport: 'Générer le rapport',
      clearFilters: 'Effacer les filtres',
      selectDepartments: 'Sélectionner les départements',
      selectEmployees: 'Sélectionner les employés',
      allDepartments: 'Tous les départements',
      allEmployees: 'Tous les employés'
    },
    en: {
      reportConfiguration: 'Report Configuration',
      dateRange: 'Date Range',
      startDate: 'Start Date',
      endDate: 'End Date',
      departments: 'Departments',
      employees: 'Employees',
      reportType: 'Report Type',
      advancedOptions: 'Advanced Options',
      includeOvertime: 'Include Overtime',
      includeBreaks: 'Include Break Times',
      customWorkingHours: 'Custom Working Hours',
      generateReport: 'Generate Report',
      clearFilters: 'Clear Filters',
      selectDepartments: 'Select Departments',
      selectEmployees: 'Select Employees',
      allDepartments: 'All Departments',
      allEmployees: 'All Employees'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const departmentOptions = [
    { value: 'all', label: t?.allDepartments },
    { value: 'production', label: 'Production' },
    { value: 'administration', label: 'Administration' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'qualite', label: 'Qualité' },
    { value: 'logistique', label: 'Logistique' },
    { value: 'rh', label: 'Ressources Humaines' }
  ];

  const employeeOptions = [
    { value: 'all', label: t?.allEmployees },
    { value: 'jean-dupont', label: 'Jean Dupont' },
    { value: 'marie-martin', label: 'Marie Martin' },
    { value: 'pierre-bernard', label: 'Pierre Bernard' },
    { value: 'sophie-dubois', label: 'Sophie Dubois' },
    { value: 'luc-moreau', label: 'Luc Moreau' },
    { value: 'claire-petit', label: 'Claire Petit' }
  ];

  const reportTypeOptions = [
    { value: 'daily-summary', label: 'Résumé quotidien' },
    { value: 'detailed-logs', label: 'Journaux détaillés' },
    { value: 'tardiness-analysis', label: 'Analyse des retards' },
    { value: 'absence-tracking', label: 'Suivi des absences' },
    { value: 'overtime-report', label: 'Rapport heures supplémentaires' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleGenerateReport = () => {
    onGenerateReport(filters);
  };

  const handleClearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      departments: [],
      employees: [],
      reportType: 'daily-summary',
      includeOvertime: true,
      includeBreaks: false,
      customHours: false
    });
    onClearFilters();
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Settings" size={20} color="var(--color-primary)" />
          <span>{t?.reportConfiguration}</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Date Range */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">{t?.dateRange}</h3>
          <div className="space-y-3">
            <Input
              type="date"
              label={t?.startDate}
              value={filters?.startDate}
              onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
              className="w-full"
            />
            <Input
              type="date"
              label={t?.endDate}
              value={filters?.endDate}
              onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Department & Employee Selection */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Sélection</h3>
          <div className="space-y-3">
            <Select
              label={t?.departments}
              placeholder={t?.selectDepartments}
              options={departmentOptions}
              value={filters?.departments}
              onChange={(value) => handleFilterChange('departments', value)}
              multiple
              searchable
              clearable
            />
            <Select
              label={t?.employees}
              placeholder={t?.selectEmployees}
              options={employeeOptions}
              value={filters?.employees}
              onChange={(value) => handleFilterChange('employees', value)}
              multiple
              searchable
              clearable
            />
          </div>
        </div>

        {/* Report Type & Advanced Options */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">{t?.reportType}</h3>
          <div className="space-y-3">
            <Select
              label={t?.reportType}
              options={reportTypeOptions}
              value={filters?.reportType}
              onChange={(value) => handleFilterChange('reportType', value)}
            />
            
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-medium text-muted-foreground">{t?.advancedOptions}</h4>
              <Checkbox
                label={t?.includeOvertime}
                checked={filters?.includeOvertime}
                onChange={(e) => handleFilterChange('includeOvertime', e?.target?.checked)}
              />
              <Checkbox
                label={t?.includeBreaks}
                checked={filters?.includeBreaks}
                onChange={(e) => handleFilterChange('includeBreaks', e?.target?.checked)}
              />
              <Checkbox
                label={t?.customWorkingHours}
                checked={filters?.customHours}
                onChange={(e) => handleFilterChange('customHours', e?.target?.checked)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={handleClearFilters}
          disabled={isGenerating}
          iconName="RotateCcw"
          iconPosition="left"
        >
          {t?.clearFilters}
        </Button>
        <Button
          variant="default"
          onClick={handleGenerateReport}
          loading={isGenerating}
          iconName="FileText"
          iconPosition="left"
        >
          {t?.generateReport}
        </Button>
      </div>
    </div>
  );
};

export default ReportFilters;