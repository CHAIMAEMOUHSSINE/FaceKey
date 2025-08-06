import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const QuickFilters = ({ 
  filters = {},
  onFilterChange = () => {},
  departments = [],
  currentLanguage = 'fr' 
}) => {
  const translations = {
    fr: {
      quickFilters: 'Filtres Rapides',
      allDepartments: 'Tous les Départements',
      allStatuses: 'Tous les Statuts',
      allRoles: 'Tous les Rôles',
      department: 'Département',
      enrollmentStatus: 'Statut Inscription',
      role: 'Rôle',
      enrolled: 'Inscrit',
      notEnrolled: 'Non Inscrit',
      pending: 'En Attente',
      employee: 'Employé',
      manager: 'Manager',
      admin: 'Administrateur',
      hr: 'RH',
      clearFilters: 'Effacer Filtres',
      activeFilters: 'Filtres Actifs'
    },
    en: {
      quickFilters: 'Quick Filters',
      allDepartments: 'All Departments',
      allStatuses: 'All Statuses',
      allRoles: 'All Roles',
      department: 'Department',
      enrollmentStatus: 'Enrollment Status',
      role: 'Role',
      enrolled: 'Enrolled',
      notEnrolled: 'Not Enrolled',
      pending: 'Pending',
      employee: 'Employee',
      manager: 'Manager',
      admin: 'Administrator',
      hr: 'HR',
      clearFilters: 'Clear Filters',
      activeFilters: 'Active Filters'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const departmentOptions = [
    { value: '', label: t?.allDepartments },
    ...departments?.map(dept => ({ value: dept, label: dept }))
  ];

  const statusOptions = [
    { value: '', label: t?.allStatuses },
    { value: 'enrolled', label: t?.enrolled },
    { value: 'notEnrolled', label: t?.notEnrolled },
    { value: 'pending', label: t?.pending }
  ];

  const roleOptions = [
    { value: '', label: t?.allRoles },
    { value: 'employee', label: t?.employee },
    { value: 'manager', label: t?.manager },
    { value: 'admin', label: t?.admin },
    { value: 'hr', label: t?.hr }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      department: '',
      enrollmentStatus: '',
      role: ''
    });
  };

  const activeFilterCount = Object.values(filters)?.filter(value => value && value !== '')?.length;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {t?.quickFilters}
        </h3>
        {activeFilterCount > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {activeFilterCount} {t?.activeFilters}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-destructive hover:text-destructive"
            >
              {t?.clearFilters}
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <Select
            label={t?.department}
            options={departmentOptions}
            value={filters?.department || ''}
            onChange={(value) => handleFilterChange('department', value)}
            className="w-full"
          />
        </div>

        <div>
          <Select
            label={t?.enrollmentStatus}
            options={statusOptions}
            value={filters?.enrollmentStatus || ''}
            onChange={(value) => handleFilterChange('enrollmentStatus', value)}
            className="w-full"
          />
        </div>

        <div>
          <Select
            label={t?.role}
            options={roleOptions}
            value={filters?.role || ''}
            onChange={(value) => handleFilterChange('role', value)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default QuickFilters;