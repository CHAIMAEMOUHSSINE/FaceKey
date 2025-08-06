import React, { useState, useEffect } from 'react';
import UserProfileHeader from '../../components/ui/UserProfileHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import MetricsCard from './components/MetricsCard';
import AttendanceOverview from './components/AttendanceOverview';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import AlertsPanel from './components/AlertsPanel';
import FilterToolbar from './components/FilterToolbar';
import Icon from '../../components/AppIcon';


const HRAdminDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const currentUser = {
    name: 'Claire Dubois',
    role: 'hr',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
  };

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  const handleLogout = () => {
    localStorage.removeItem('language');
    window.location.href = '/login-authentication';
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Mock metrics data
  const metricsData = [
    {
      title: 'Total Employés',
      value: '150',
      percentage: 5,
      trend: 'up',
      icon: 'Users',
      color: 'primary',
      isLoading
    },
    {
      title: 'Présents Aujourd\'hui',
      value: '128',
      percentage: 12,
      trend: 'up',
      icon: 'UserCheck',
      color: 'success',
      isLoading
    },
    {
      title: 'En Retard',
      value: '7',
      percentage: 8,
      trend: 'down',
      icon: 'Clock',
      color: 'warning',
      isLoading
    },
    {
      title: 'Absents',
      value: '15',
      percentage: 3,
      trend: 'up',
      icon: 'UserX',
      color: 'destructive',
      isLoading
    }
  ];

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
        userRole={currentUser?.role}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        currentLanguage={currentLanguage}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-smooth ${
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-70'
      }`}>
        {/* Breadcrumbs */}
        <NavigationBreadcrumbs
          currentLanguage={currentLanguage}
          userRole={currentUser?.role}
        />

        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {currentLanguage === 'fr' ? 'Tableau de Bord RH' : 'HR Dashboard'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {currentLanguage === 'fr' ?'Vue d\'ensemble des présences et gestion des employés' :'Attendance overview and employee management'
                }
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date()?.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          {/* Filter Toolbar */}
          <FilterToolbar
            currentLanguage={currentLanguage}
            onFiltersChange={handleFiltersChange}
          />

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                percentage={metric?.percentage}
                trend={metric?.trend}
                icon={metric?.icon}
                color={metric?.color}
                isLoading={metric?.isLoading}
              />
            ))}
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left Column - Main Content */}
            <div className="xl:col-span-8 space-y-6">
              {/* Attendance Overview Chart */}
              <AttendanceOverview currentLanguage={currentLanguage} />

              {/* Recent Activity */}
              <RecentActivity currentLanguage={currentLanguage} />
            </div>

            {/* Right Column - Sidebar Content */}
            <div className="xl:col-span-4 space-y-6">
              {/* Quick Actions */}
              <QuickActions currentLanguage={currentLanguage} />

              {/* Alerts Panel */}
              <AlertsPanel currentLanguage={currentLanguage} />
            </div>
          </div>

          {/* Additional Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
                </div>
                <h3 className="font-semibold text-foreground">Tendance Hebdomadaire</h3>
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">+8.5%</div>
              <p className="text-sm text-muted-foreground">
                Amélioration de la ponctualité cette semaine
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Icon name="Award" size={20} color="var(--color-success)" />
                </div>
                <h3 className="font-semibold text-foreground">Meilleur Département</h3>
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">Production</div>
              <p className="text-sm text-muted-foreground">
                98.5% de présence ce mois
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
                </div>
                <h3 className="font-semibold text-foreground">Attention Requise</h3>
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">3</div>
              <p className="text-sm text-muted-foreground">
                Employés avec absences répétées
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HRAdminDashboard;