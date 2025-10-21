import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileHeader from '../../components/ui/UserProfileHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import QuickActionFab from '../../components/ui/QuickActionFab';
import ReportFilters from './components/ReportFilters';
import ReportPreview from './components/ReportPreview';
import AttendanceCharts from './components/AttendanceCharts';
import ExportOptions from './components/ExportOptions';
import Icon from '../../components/AppIcon';
import RoleBasedSidebar from "../../components/ui/RoleBasedSidebar";

const AttendanceReports = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: 'Nourredine ALLASSAK ',
    role: 'HR',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16-OcAOYQV6Bf6cePOupN1QnGfhnRjpv3bQ&s'
  });

  // Load language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    navigate('/login-authentication');
  };

  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Handle report generation
  const handleGenerateReport = async (filters) => {
    setIsGeneratingReport(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock report data based on filters
      const mockData = {
        filters: filters,
        generatedAt: new Date()?.toISOString(),
        totalRecords: 157,
        summary: {
          totalEmployees: 157,
          presentToday: 142,
          absentToday: 15,
          lateArrivals: 23,
          earlyDepartures: 8
        }
      };
      
      setReportData(mockData);
      setIsGeneratingReport(false);
    }, 2000);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setReportData(null);
  };

  // Handle export
  const handleExport = async (exportConfig) => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      // Create mock download
      const filename = `rapport-presence-${new Date()?.toISOString()?.split('T')?.[0]}.${exportConfig?.format}`;
      console.log(`Exporting report as ${filename} with config:`, exportConfig);
      
      // In a real app, this would trigger actual file download
      const mockDownloadUrl = `data:text/plain;charset=utf-8,Mock report data for ${filename}`;
      const link = document.createElement('a');
      link.href = mockDownloadUrl;
      link.download = filename;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
      
      setIsExporting(false);
    }, 3000);
  };

  const translations = {
    fr: {
      pageTitle: 'Rapports de Présence',
      pageDescription: 'Générez et exportez des rapports détaillés sur la présence des employés',
      reportGenerated: 'Rapport généré avec succès',
      reportExported: 'Rapport exporté avec succès'
    },
    en: {
      pageTitle: 'Attendance Reports',
      pageDescription: 'Generate and export detailed employee attendance reports',
      reportGenerated: 'Report generated successfully',
      reportExported: 'Report exported successfully'
    }
  };

  const t = translations?.[currentLanguage] || translations?.fr;

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
        onToggleCollapse={handleSidebarToggle}
        currentLanguage={currentLanguage}
      />
      {/* Main Content */}
      <main className={`transition-smooth ${
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-70'
      } pt-16`}>
        {/* Breadcrumbs */}
        <NavigationBreadcrumbs
          currentLanguage={currentLanguage}
          userRole={currentUser?.role}
        />

        {/* Page Header */}
        <div className="px-6 py-6 border-b border-border bg-card">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                <Icon name="BarChart3" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">{t?.pageTitle}</h1>
                <p className="text-muted-foreground mt-1">{t?.pageDescription}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Report Filters */}
            <ReportFilters
              onGenerateReport={handleGenerateReport}
              onClearFilters={handleClearFilters}
              isGenerating={isGeneratingReport}
              currentLanguage={currentLanguage}
            />

            {/* Report Preview */}
            <ReportPreview
              reportData={reportData}
              isLoading={isGeneratingReport}
              currentLanguage={currentLanguage}
            />

            {/* Charts - Only show when report is generated */}
            {reportData && !isGeneratingReport && (
              <AttendanceCharts
                reportData={reportData}
                currentLanguage={currentLanguage}
              />
            )}

            {/* Export Options - Only show when report is generated */}
            {reportData && !isGeneratingReport && (
              <ExportOptions
                onExport={handleExport}
                isExporting={isExporting}
                currentLanguage={currentLanguage}
              />
            )}
          </div>
        </div>
      </main>
      {/* Quick Action FAB */}
      <QuickActionFab
        userRole={currentUser?.role}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default AttendanceReports;