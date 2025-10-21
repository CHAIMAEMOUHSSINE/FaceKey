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
    name: "Chaimae Mouhssine",
    role: "Employee",
    avatar: "data:image/jpeg;base64,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 "
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
      <div className="min-h-screen flex bg-background">
        {/* Sidebar */}
        <RoleBasedSidebar
            userRole={currentUser?.role}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            currentLanguage={currentLanguage}
        />

        {/* Main section */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-70'}`}>
          {/* Header */}
          <UserProfileHeader
              user={currentUser}
              onLogout={handleLogout}
              onLanguageChange={handleLanguageChange}
              currentLanguage={currentLanguage}
          />

          {/* Main Content */}
          <main className="pt-20 px-6 space-y-6 flex-1">
            {/* Breadcrumbs */}
            <NavigationBreadcrumbs
                currentLanguage={currentLanguage}
                userRole={currentUser?.role}
            />

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {currentLanguage === 'fr'
                      ? 'Mon Historique de Présence'
                      : 'My Attendance History'}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {currentLanguage === 'fr'
                      ? 'Consultez et analysez vos données de présence personnelles'
                      : 'View and analyze your personal attendance data'}
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

            {/* Main Grid */}
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
      </div>
  );

};

export default PersonalAttendanceHistory;