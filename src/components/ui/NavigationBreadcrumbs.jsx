import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationBreadcrumbs = ({ 
  currentLanguage = 'fr',
  userRole = 'employee'
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const translations = {
    fr: {
      home: 'Accueil',
      dashboard: 'Tableau de Bord',
      employeeDashboard: 'Tableau de Bord Employé',
      hrDashboard: 'Tableau de Bord RH',
      personalAttendance: 'Mes Présences',
      employeeManagement: 'Gestion Employés',
      attendanceReports: 'Rapports de Présence',
      loginAuthentication: 'Authentification'
    },
    en: {
      home: 'Home',
      dashboard: 'Dashboard',
      employeeDashboard: 'Employee Dashboard',
      hrDashboard: 'HR Dashboard',
      personalAttendance: 'My Attendance',
      employeeManagement: 'Employee Management',
      attendanceReports: 'Attendance Reports',
      loginAuthentication: 'Authentication'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

  const routeMap = {
    '/': { label: t?.home, icon: 'Home' },
    '/employee-dashboard': { label: t?.employeeDashboard, icon: 'LayoutDashboard' },
    '/hr-admin-dashboard': { label: t?.hrDashboard, icon: 'LayoutDashboard' },
    '/personal-attendance-history': { label: t?.personalAttendance, icon: 'Clock' },
    '/employee-management': { label: t?.employeeManagement, icon: 'Users' },
    '/attendance-reports': { label: t?.attendanceReports, icon: 'BarChart3' },
    '/login-authentication': { label: t?.loginAuthentication, icon: 'Lock' }
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [];

    // Add home breadcrumb for non-root paths
    if (location.pathname !== '/') {
      const homePath = userRole === 'admin' || userRole === 'hr' ? '/hr-admin-dashboard' : '/employee-dashboard';
      breadcrumbs?.push({
        label: t?.dashboard,
        path: homePath,
        icon: 'LayoutDashboard'
      });
    }

    // Build breadcrumb path
    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap?.[currentPath];
      
      if (routeInfo) {
        breadcrumbs?.push({
          label: routeInfo?.label,
          path: currentPath,
          icon: routeInfo?.icon,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  // Don't show breadcrumbs on login page or if only one item
  if (location.pathname === '/login-authentication' || breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 px-6 py-4 bg-background border-b border-border" aria-label="Breadcrumb">
      <div className="flex items-center space-x-2 text-sm">
        {breadcrumbs?.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb?.path}>
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                color="var(--color-muted-foreground)" 
                className="mx-1"
              />
            )}
            
            {breadcrumb?.isLast ? (
              <div className="flex items-center space-x-2 text-foreground font-medium">
                <Icon 
                  name={breadcrumb?.icon} 
                  size={16} 
                  color="var(--color-primary)"
                />
                <span className="hidden sm:inline">{breadcrumb?.label}</span>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleBreadcrumbClick(breadcrumb?.path)}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground p-1 h-auto"
              >
                <Icon 
                  name={breadcrumb?.icon} 
                  size={16} 
                  color="var(--color-muted-foreground)"
                />
                <span className="hidden sm:inline">{breadcrumb?.label}</span>
              </Button>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default NavigationBreadcrumbs;