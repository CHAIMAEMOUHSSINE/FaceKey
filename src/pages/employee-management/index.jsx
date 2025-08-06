import React, { useState, useEffect } from 'react';
import UserProfileHeader from '../../components/ui/UserProfileHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import EmployeeTable from './components/EmployeeTable';
import EmployeeStatsCard from './components/EmployeeStatsCard';
import DepartmentChart from './components/DepartmentChart';
import QuickFilters from './components/QuickFilters';
import AddEmployeeModal from './components/AddEmployeeModal';

const EmployeeManagement = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    department: '',
    enrollmentStatus: '',
    role: ''
  });
  const [isExporting, setIsExporting] = useState(false);

  // Mock user data
  const currentUser = {
    name: "Marie Dubois",
    role: "HR",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  // Mock employees data
  const [employees, setEmployees] = useState([
    {
      id: 1,
      employeeId: "EMP001",
      name: "Jean Dupont",
      email: "jean.dupont@lafargeholcim.com",
      phone: "+33 1 23 45 67 89",
      department: "IT",
      role: "employee",
      enrollmentStatus: "enrolled",
      isActive: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastActivity: new Date(Date.now() - 3600000),
      startDate: "2023-01-15"
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Sophie Martin",
      email: "sophie.martin@lafargeholcim.com",
      phone: "+33 1 23 45 67 90",
      department: "Finance",
      role: "manager",
      enrollmentStatus: "enrolled",
      isActive: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastActivity: new Date(Date.now() - 1800000),
      startDate: "2022-03-10"
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Pierre Leroy",
      email: "pierre.leroy@lafargeholcim.com",
      phone: "+33 1 23 45 67 91",
      department: "Operations",
      role: "employee",
      enrollmentStatus: "pending",
      isActive: false,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastActivity: new Date(Date.now() - 86400000),
      startDate: "2023-11-20"
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Claire Bernard",
      email: "claire.bernard@lafargeholcim.com",
      phone: "+33 1 23 45 67 92",
      department: "Sales",
      role: "employee",
      enrollmentStatus: "enrolled",
      isActive: true,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      lastActivity: new Date(Date.now() - 7200000),
      startDate: "2023-06-01"
    },
    {
      id: 5,
      employeeId: "EMP005",
      name: "Antoine Moreau",
      email: "antoine.moreau@lafargeholcim.com",
      phone: "+33 1 23 45 67 93",
      department: "Marketing",
      role: "manager",
      enrollmentStatus: "notEnrolled",
      isActive: false,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      lastActivity: new Date(Date.now() - 172800000),
      startDate: "2023-08-15"
    },
    {
      id: 6,
      employeeId: "EMP006",
      name: "Isabelle Rousseau",
      email: "isabelle.rousseau@lafargeholcim.com",
      phone: "+33 1 23 45 67 94",
      department: "HR",
      role: "hr",
      enrollmentStatus: "enrolled",
      isActive: true,
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      lastActivity: new Date(Date.now() - 900000),
      startDate: "2022-01-10"
    }
  ]);

  const translations = {
    fr: {
      employeeManagement: 'Gestion des Employés',
      addEmployee: 'Ajouter Employé',
      exportData: 'Exporter Données',
      exporting: 'Export en cours...',
      overview: 'Vue d\'ensemble',
      filters: 'Filtres',
      employeeAdded: 'Employé ajouté avec succès',
      employeeUpdated: 'Employé mis à jour avec succès',
      employeeDeleted: 'Employé supprimé avec succès',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet employé ?',
      bulkExportSuccess: 'Export réalisé avec succès',
      bulkDeleteSuccess: 'Employés supprimés avec succès'
    },
    en: {
      employeeManagement: 'Employee Management',
      addEmployee: 'Add Employee',
      exportData: 'Export Data',
      exporting: 'Exporting...',
      overview: 'Overview',
      filters: 'Filters',
      employeeAdded: 'Employee added successfully',
      employeeUpdated: 'Employee updated successfully',
      employeeDeleted: 'Employee deleted successfully',
      confirmDelete: 'Are you sure you want to delete this employee?',
      bulkExportSuccess: 'Export completed successfully',
      bulkDeleteSuccess: 'Employees deleted successfully'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  const handleLogout = () => {
    localStorage.removeItem('language');
    window.location.href = '/login-authentication';
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const filteredEmployees = employees?.filter(employee => {
    if (filters?.department && employee?.department !== filters?.department) return false;
    if (filters?.enrollmentStatus && employee?.enrollmentStatus !== filters?.enrollmentStatus) return false;
    if (filters?.role && employee?.role !== filters?.role) return false;
    return true;
  });

  const uniqueDepartments = [...new Set(employees.map(emp => emp.department))];

  const handleAddEmployee = async (employeeData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newEmployee = {
      id: employees?.length + 1,
      ...employeeData,
      name: `${employeeData?.firstName} ${employeeData?.lastName}`,
      enrollmentStatus: employeeData?.faceImage ? 'enrolled' : 'notEnrolled',
      isActive: true,
      avatar: employeeData?.faceImage || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
      lastActivity: new Date()
    };
    
    setEmployees(prev => [...prev, newEmployee]);
    console.log(t?.employeeAdded);
  };

  const handleEditEmployee = (employee) => {
    console.log('Edit employee:', employee);
    // Implementation for edit modal would go here
  };

  const handleDeleteEmployee = (employee) => {
    if (window.confirm(t?.confirmDelete)) {
      setEmployees(prev => prev?.filter(emp => emp?.id !== employee?.id));
      console.log(t?.employeeDeleted);
    }
  };

  const handleViewEmployee = (employee) => {
    console.log('View employee:', employee);
    // Implementation for view modal would go here
  };

  const handleBulkAction = async (action, selectedIds) => {
    if (action === 'delete') {
      if (window.confirm(`${t?.confirmDelete} (${selectedIds?.length} employés)`)) {
        setEmployees(prev => prev?.filter(emp => !selectedIds?.includes(emp?.id)));
        console.log(t?.bulkDeleteSuccess);
      }
    } else if (action === 'export') {
      setIsExporting(true);
      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(t?.bulkExportSuccess);
      setIsExporting(false);
    }
  };

  const handleExportAll = async () => {
    setIsExporting(true);
    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(t?.bulkExportSuccess);
    setIsExporting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <UserProfileHeader
        user={currentUser}
        onLogout={handleLogout}
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
      />
      {/* Sidebar */}
      <RoleBasedSidebar
        userRole={currentUser?.role?.toLowerCase()}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        currentLanguage={currentLanguage}
      />
      {/* Main Content */}
      <div className={`transition-smooth ${
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-70'
      } pt-16`}>
        {/* Breadcrumbs */}
        <NavigationBreadcrumbs
          currentLanguage={currentLanguage}
          userRole={currentUser?.role?.toLowerCase()}
        />

        {/* Page Header */}
        <div className="px-6 py-6 border-b border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                {t?.employeeManagement}
              </h1>
              <p className="text-muted-foreground mt-1">
                Gérez les profils employés et l'inscription faciale
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleExportAll}
                loading={isExporting}
                disabled={employees?.length === 0}
              >
                <Icon name="Download" size={16} />
                <span className="hidden sm:inline ml-2">
                  {isExporting ? t?.exporting : t?.exportData}
                </span>
              </Button>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Icon name="Plus" size={16} />
                <span className="ml-2">{t?.addEmployee}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left Section - Main Content */}
            <div className="xl:col-span-8 space-y-6">
              {/* Statistics Cards */}
              <EmployeeStatsCard
                employees={filteredEmployees}
                currentLanguage={currentLanguage}
              />

              {/* Employee Table */}
              <EmployeeTable
                employees={filteredEmployees}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
                onView={handleViewEmployee}
                onBulkAction={handleBulkAction}
                currentLanguage={currentLanguage}
              />
            </div>

            {/* Right Section - Sidebar Content */}
            <div className="xl:col-span-4 space-y-6">
              {/* Quick Filters */}
              <QuickFilters
                filters={filters}
                onFilterChange={setFilters}
                departments={uniqueDepartments}
                currentLanguage={currentLanguage}
              />

              {/* Department Distribution Chart */}
              <DepartmentChart
                employees={employees}
                currentLanguage={currentLanguage}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddEmployee}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default EmployeeManagement;