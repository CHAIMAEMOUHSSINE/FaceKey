import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const EmployeeTable = ({ 
  employees = [], 
  onEdit = () => {}, 
  onDelete = () => {}, 
  onView = () => {},
  onBulkAction = () => {},
  currentLanguage = 'fr' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const translations = {
    fr: {
      search: 'Rechercher employés...',
      employeeId: 'ID Employé',
      name: 'Nom',
      department: 'Département',
      role: 'Rôle',
      enrollmentStatus: 'Statut Inscription',
      lastActivity: 'Dernière Activité',
      actions: 'Actions',
      enrolled: 'Inscrit',
      notEnrolled: 'Non Inscrit',
      pending: 'En Attente',
      active: 'Actif',
      inactive: 'Inactif',
      edit: 'Modifier',
      delete: 'Supprimer',
      view: 'Voir',
      selectAll: 'Tout sélectionner',
      selected: 'sélectionné(s)',
      bulkActions: 'Actions groupées',
      deleteSelected: 'Supprimer sélectionnés',
      exportSelected: 'Exporter sélectionnés',
      noResults: 'Aucun employé trouvé',
      showingResults: 'Affichage de',
      of: 'sur',
      employees: 'employés',
      previous: 'Précédent',
      next: 'Suivant'
    },
    en: {
      search: 'Search employees...',
      employeeId: 'Employee ID',
      name: 'Name',
      department: 'Department',
      role: 'Role',
      enrollmentStatus: 'Enrollment Status',
      lastActivity: 'Last Activity',
      actions: 'Actions',
      enrolled: 'Enrolled',
      notEnrolled: 'Not Enrolled',
      pending: 'Pending',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      selectAll: 'Select All',
      selected: 'selected',
      bulkActions: 'Bulk Actions',
      deleteSelected: 'Delete Selected',
      exportSelected: 'Export Selected',
      noResults: 'No employees found',
      showingResults: 'Showing',
      of: 'of',
      employees: 'employees',
      previous: 'Previous',
      next: 'Next'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees?.filter(employee =>
      employee?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      employee?.employeeId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      employee?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      employee?.role?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'lastActivity') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [employees, searchTerm, sortConfig]);

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedEmployees?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedEmployees, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedEmployees?.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEmployees(paginatedEmployees?.map(emp => emp?.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (employeeId, checked) => {
    if (checked) {
      setSelectedEmployees(prev => [...prev, employeeId]);
    } else {
      setSelectedEmployees(prev => prev?.filter(id => id !== employeeId));
    }
  };

  const getEnrollmentStatusBadge = (status) => {
    const statusConfig = {
      enrolled: { color: 'bg-success text-success-foreground', label: t?.enrolled },
      notEnrolled: { color: 'bg-destructive text-destructive-foreground', label: t?.notEnrolled },
      pending: { color: 'bg-warning text-warning-foreground', label: t?.pending }
    };

    const config = statusConfig?.[status] || statusConfig?.notEnrolled;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getActivityStatusBadge = (isActive) => {
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        isActive ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
      }`}>
        {isActive ? t?.active : t?.inactive}
      </span>
    );
  };

  const formatLastActivity = (date) => {
    return new Date(date)?.toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and Bulk Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="w-full sm:w-96">
          <Input
            type="search"
            placeholder={t?.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        </div>

        {selectedEmployees?.length > 0 && (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">
              {selectedEmployees?.length} {t?.selected}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('export', selectedEmployees)}
            >
              <Icon name="Download" size={16} />
              <span className="hidden sm:inline ml-2">{t?.exportSelected}</span>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onBulkAction('delete', selectedEmployees)}
            >
              <Icon name="Trash2" size={16} />
              <span className="hidden sm:inline ml-2">{t?.deleteSelected}</span>
            </Button>
          </div>
        )}
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block bg-card rounded-lg border border-border shadow-elevation-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left">
                  <Checkbox
                    checked={selectedEmployees?.length === paginatedEmployees?.length && paginatedEmployees?.length > 0}
                    onChange={(e) => handleSelectAll(e?.target?.checked)}
                  />
                </th>
                {[
                  { key: 'employeeId', label: t?.employeeId },
                  { key: 'name', label: t?.name },
                  { key: 'department', label: t?.department },
                  { key: 'role', label: t?.role },
                  { key: 'enrollmentStatus', label: t?.enrollmentStatus },
                  { key: 'lastActivity', label: t?.lastActivity }
                ]?.map((column) => (
                  <th
                    key={column?.key}
                    className="px-6 py-4 text-left text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                    onClick={() => handleSort(column?.key)}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{column?.label}</span>
                      {sortConfig?.key === column?.key && (
                        <Icon
                          name={sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'}
                          size={16}
                        />
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  {t?.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedEmployees?.map((employee) => (
                <tr key={employee?.id} className="hover:bg-muted/50 transition-smooth">
                  <td className="px-6 py-4">
                    <Checkbox
                      checked={selectedEmployees?.includes(employee?.id)}
                      onChange={(e) => handleSelectEmployee(employee?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {employee?.employeeId}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10">
                        <Image
                          src={employee?.avatar}
                          alt={employee?.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{employee?.name}</div>
                        <div className="text-sm text-muted-foreground">{employee?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{employee?.department}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{employee?.role}</td>
                  <td className="px-6 py-4">
                    {getEnrollmentStatusBadge(employee?.enrollmentStatus)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm text-foreground">
                        {formatLastActivity(employee?.lastActivity)}
                      </div>
                      {getActivityStatusBadge(employee?.isActive)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(employee)}
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(employee)}
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(employee)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden space-y-4">
        {paginatedEmployees?.map((employee) => (
          <div key={employee?.id} className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedEmployees?.includes(employee?.id)}
                  onChange={(e) => handleSelectEmployee(employee?.id, e?.target?.checked)}
                />
                <div className="flex-shrink-0 w-12 h-12">
                  <Image
                    src={employee?.avatar}
                    alt={employee?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{employee?.name}</h3>
                  <p className="text-sm text-muted-foreground">{employee?.employeeId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => onView(employee)}>
                  <Icon name="Eye" size={16} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEdit(employee)}>
                  <Icon name="Edit" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(employee)}
                  className="text-destructive hover:text-destructive"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t?.department}</p>
                <p className="text-sm font-medium text-foreground">{employee?.department}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t?.role}</p>
                <p className="text-sm font-medium text-foreground">{employee?.role}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t?.enrollmentStatus}</p>
                  {getEnrollmentStatusBadge(employee?.enrollmentStatus)}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t?.lastActivity}</p>
                  <p className="text-sm text-foreground">{formatLastActivity(employee?.lastActivity)}</p>
                </div>
              </div>
              {getActivityStatusBadge(employee?.isActive)}
            </div>
          </div>
        ))}
      </div>
      {/* No Results */}
      {filteredAndSortedEmployees?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">{t?.noResults}</h3>
          <p className="text-muted-foreground">
            {searchTerm ? `Aucun résultat pour "${searchTerm}"` : 'Aucun employé disponible'}
          </p>
        </div>
      )}
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {t?.showingResults} {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredAndSortedEmployees?.length)} {t?.of} {filteredAndSortedEmployees?.length} {t?.employees}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <Icon name="ChevronLeft" size={16} />
              <span className="hidden sm:inline ml-1">{t?.previous}</span>
            </Button>
            <span className="text-sm text-foreground px-3 py-1">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <span className="hidden sm:inline mr-1">{t?.next}</span>
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;