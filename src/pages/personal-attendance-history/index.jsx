import React, { useState, useEffect } from 'react';
import UserProfileHeader from '../../components/ui/UserProfileHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import QuickActionFab from '../../components/ui/QuickActionFab';
import AttendanceCalendar from './components/AttendanceCalendar';
import AttendanceTimeline from './components/AttendanceTimeline';
import AttendanceFilters from './components/AttendanceFilters';
import AttendanceCharts from './components/AttendanceCharts';
import AttendanceSummary from './components/AttendanceSummary';
import ExportControls from './components/ExportControls';

const PersonalAttendanceHistory = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isClocked, setIsClocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data
  const currentUser = {
    name: "Jean Dupont",
    role: "employee",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  // Mock attendance data
  const mockAttendanceData = [
    {
      id: 1,
      date: "2025-01-06",
      status: "present",
      clockIn: "08:30:00",
      clockOut: "17:15:00",
      totalHours: 495,
      breakTime: 60,
      overtime: 15
    },
    {
      id: 2,
      date: "2025-01-05",
      status: "late",
      clockIn: "09:15:00",
      clockOut: "17:30:00",
      totalHours: 495,
      breakTime: 60,
      overtime: 30
    },
    {
      id: 3,
      date: "2025-01-04",
      status: "present",
      clockIn: "08:25:00",
      clockOut: "17:00:00",
      totalHours: 515,
      breakTime: 60,
      overtime: 35
    },
    {
      id: 4,
      date: "2025-01-03",
      status: "present",
      clockIn: "08:30:00",
      clockOut: "17:10:00",
      totalHours: 480,
      breakTime: 60,
      overtime: 0
    },
    {
      id: 5,
      date: "2025-01-02",
      status: "absent",
      clockIn: null,
      clockOut: null,
      totalHours: 0,
      breakTime: 0,
      overtime: 0
    },
    {
      id: 6,
      date: "2025-01-01",
      status: "holiday",
      clockIn: null,
      clockOut: null,
      totalHours: 0,
      breakTime: 0,
      overtime: 0
    }
  ];

  // Mock weekly data for charts
  const mockWeeklyData = [
    { week: "Sem 1", hours: 38.5 },
    { week: "Sem 2", hours: 42.0 },
    { week: "Sem 3", hours: 40.5 },
    { week: "Sem 4", hours: 39.0 },
    { week: "Sem 5", hours: 41.5 }
  ];

  // Mock monthly data for charts
  const mockMonthlyData = [
    { month: "Oct", averageHours: 8.2, totalDays: 22 },
    { month: "Nov", averageHours: 8.1, totalDays: 21 },
    { month: "Déc", averageHours: 7.8, totalDays: 20 },
    { month: "Jan", averageHours: 8.3, totalDays: 23 }
  ];

  // Mock punctuality data
  const mockPunctualityData = [
    { name: "À l\'heure", status: "onTime", value: 18 },
    { name: "En retard", status: "late", value: 3 },
    { name: "Absent", status: "absent", value: 2 }
  ];

  // Mock summary data
  const mockSummaryData = {
    totalDaysWorked: 23,
    averageDailyHours: 8.2,
    punctualityRate: 85.7,
    overtimeHours: 12.5,
    totalHours: 188.6,
    presentDays: 21,
    lateDays: 3,
    absentDays: 2
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
    setFilteredRecords(mockAttendanceData);
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  const handleLogout = () => {
    localStorage.removeItem('language');
    window.location.href = '/login-authentication';
  };

  const handleFiltersChange = (filters) => {
    let filtered = [...mockAttendanceData];

    // Filter by date range
    if (filters?.startDate && filters?.endDate) {
      filtered = filtered?.filter(record => {
        const recordDate = new Date(record.date);
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);
        return recordDate >= startDate && recordDate <= endDate;
      });
    }

    // Filter by status
    if (filters?.status && filters?.status !== 'all') {
      filtered = filtered?.filter(record => record?.status === filters?.status);
    }

    // Filter by search term
    if (filters?.searchTerm) {
      const searchTerm = filters?.searchTerm?.toLowerCase();
      filtered = filtered?.filter(record => 
        record?.date?.includes(searchTerm) ||
        record?.status?.toLowerCase()?.includes(searchTerm)
      );
    }

    setFilteredRecords(filtered);
  };

  const handleExport = async (exportOptions) => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would generate and download the file
    console.log('Exporting data:', exportOptions);
    
    setIsExporting(false);
  };

  const handleClockIn = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsClocked(true);
    setIsLoading(false);
  };

  const handleClockOut = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsClocked(false);
    setIsLoading(false);
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

        {/* Page Content */}
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {currentLanguage === 'fr' ? 'Mon Historique de Présence' : 'My Attendance History'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {currentLanguage === 'fr' ?'Consultez et analysez vos données de présence personnelles' :'View and analyze your personal attendance data'
                }
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <AttendanceSummary
            summaryData={mockSummaryData}
            currentLanguage={currentLanguage}
          />

          {/* Filters */}
          <AttendanceFilters
            onFiltersChange={handleFiltersChange}
            currentLanguage={currentLanguage}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Calendar */}
            <div className="xl:col-span-4">
              <AttendanceCalendar
                attendanceData={mockAttendanceData}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                currentLanguage={currentLanguage}
              />
            </div>

            {/* Timeline */}
            <div className="xl:col-span-8">
              <AttendanceTimeline
                attendanceRecords={filteredRecords}
                currentLanguage={currentLanguage}
              />
            </div>
          </div>

          {/* Charts */}
          <AttendanceCharts
            weeklyData={mockWeeklyData}
            monthlyData={mockMonthlyData}
            punctualityData={mockPunctualityData}
            currentLanguage={currentLanguage}
          />

          {/* Export Controls */}
          <ExportControls
            onExport={handleExport}
            isExporting={isExporting}
            currentLanguage={currentLanguage}
          />
        </div>
      </main>
      {/* Quick Action FAB */}
      <QuickActionFab
        userRole={currentUser?.role}
        currentLanguage={currentLanguage}
        onClockIn={handleClockIn}
        onClockOut={handleClockOut}
        isClocked={isClocked}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PersonalAttendanceHistory;