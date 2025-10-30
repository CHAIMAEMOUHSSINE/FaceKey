import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedSidebar = ({
                            userRole = 'HR',
                            isCollapsed = false,
                            onToggleCollapse = () => {},
                            currentLanguage = 'fr'
                          }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const translations = {
    fr: {
      dashboard: 'Tableau de Bord',
      myAttendance: 'Mes Présences',
      employeeManagement: 'Gestion Employés',
      reports: 'Rapports',
      employeeDashboard: 'Tableau de Bord Employé',
      hrDashboard: 'Tableau de Bord RH',
      attendanceHistory: 'Historique des Présences',
      manageEmployees: 'Gérer les Employés',
      attendanceReports: 'Rapports de Présence'
    },
    en: {
      dashboard: 'Dashboard',
      myAttendance: 'My Attendance',
      employeeManagement: 'Employee Management',
      reports: 'Reports',
      employeeDashboard: 'Employee Dashboard',
      hrDashboard: 'HR Dashboard',
      attendanceHistory: 'Attendance History',
      manageEmployees: 'Manage Employees',
      attendanceReports: 'Attendance Reports'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const getNavigationItems = () => {
    const baseItems = [
      {
        id: 'dashboard',
        label: userRole === 'admin' || userRole === 'HR' ? t?.hrDashboard : t?.employeeDashboard,
        icon: 'LayoutDashboard',
        path: userRole === 'admin' || userRole === 'HR' ? '/hr-admin-dashboard' : '/employee-dashboard',
        roles: ['employee', 'admin', 'HR']
      },
      {
        id: 'attendance',
        label: t?.attendanceHistory,
        icon: 'Clock',
        path: '/personal-attendance-history',
        roles: ['employee', 'admin', 'HR']
      }
    ];

    const adminItems = [
      {
        id: 'employees',
        label: t?.manageEmployees,
        icon: 'Users',
        path: '/employee-management',
        roles: ['admin', 'HR']
      },
      {
        id: 'reports',
        label: t?.attendanceReports,
        icon: 'BarChart3',
        path: '/attendance-reports',
        roles: ['admin', 'HR']
      }
    ];

    const allItems = [...baseItems, ...adminItems];
    return allItems?.filter(item => item?.roles?.includes(userRole));
  };

  const navigationItems = getNavigationItems();

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleMobileToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile Menu Button
  const MobileMenuButton = () => (
      <Button
          variant="ghost"
          size="sm"
          onClick={handleMobileToggle}
          className="fixed top-4 left-4 z-50 md:hidden bg-card border border-border shadow-elevation-1"
      >
        <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
      </Button>
  );

  // Desktop Sidebar
  const DesktopSidebar = () => (
      <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border shadow-elevation-1 transition-smooth ${
          isCollapsed ? 'w-16' : 'w-70'
      } hidden md:block`}>
        <div className="flex flex-col h-full">
          {/* Collapse Toggle */}
          <div className="flex items-center justify-end p-4 border-b border-border">
            <Button
                variant="ghost"
                size="sm"
                onClick={onToggleCollapse}
                className="text-muted-foreground hover:text-foreground"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={18} />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems?.map((item) => (
                <button
                    key={item?.id}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-smooth ${
                        isActiveRoute(item?.path)
                            ? 'bg-primary text-primary-foreground shadow-elevation-1'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    title={isCollapsed ? item?.label : ''}
                >
                  <Icon
                      name={item?.icon}
                      size={20}
                      color={isActiveRoute(item?.path) ? 'currentColor' : 'var(--color-muted-foreground)'}
                  />
                  {!isCollapsed && (
                      <span className="font-medium text-sm">{item?.label}</span>
                  )}
                </button>
            ))}
          </nav>
        </div>
      </aside>
  );

  // Mobile Sidebar Overlay
  const MobileSidebar = () => (
      <>
        {isMobileMenuOpen && (
            <div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
            />
        )}

        <aside className={`fixed left-0 top-0 bottom-0 z-50 w-80 bg-card border-r border-border shadow-elevation-3 transform transition-smooth md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <Icon name="Camera" size={24} color="white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">FaceTime</h2>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                </div>
              </div>
              <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-6 space-y-3">
              {navigationItems?.map((item) => (
                  <button
                      key={item?.id}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center space-x-4 px-4 py-4 rounded-lg text-left transition-smooth ${
                          isActiveRoute(item?.path)
                              ? 'bg-primary text-primary-foreground shadow-elevation-1'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                  >
                    <Icon
                        name={item?.icon}
                        size={22}
                        color={isActiveRoute(item?.path) ? 'currentColor' : 'var(--color-muted-foreground)'}
                    />
                    <span className="font-medium">{item?.label}</span>
                  </button>
              ))}
            </nav>
          </div>
        </aside>
      </>
  );

  return (
      <>
        <MobileMenuButton />
        <DesktopSidebar />
        <MobileSidebar />
      </>
  );
};

export default RoleBasedSidebar;