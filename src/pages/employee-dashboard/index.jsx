import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileHeader from '../../components/ui/UserProfileHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import QuickActionFab from '../../components/ui/QuickActionFab';
import FacialRecognitionPanel from './components/FacialRecognitionPanel';
import TodaySummaryCard from './components/TodaySummaryCard';
import RecentActivityTimeline from './components/RecentActivityTimeline';
import QuickStatsWidgets from './components/QuickStatsWidgets';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isClocked, setIsClocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [totalHours, setTotalHours] = useState('0h 00m');

  // Mock user data
  const currentUser = {
    name: 'Jean Dupont',
    role: 'Employé',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  };

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Load saved attendance state
  useEffect(() => {
    const savedClockState = localStorage.getItem('clockedIn');
    const savedClockTime = localStorage.getItem('clockInTime');
    const savedTotalHours = localStorage.getItem('totalHours');
    
    if (savedClockState === 'true') {
      setIsClocked(true);
      setClockInTime(savedClockTime);
      setTotalHours(savedTotalHours || '0h 00m');
    }
  }, []);

  // Update total hours when clocked in
  useEffect(() => {
    let interval;
    if (isClocked && clockInTime) {
      interval = setInterval(() => {
        const startTime = new Date(clockInTime);
        const now = new Date();
        const diffMs = now - startTime;
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const newTotalHours = `${hours}h ${minutes?.toString()?.padStart(2, '0')}m`;
        setTotalHours(newTotalHours);
        localStorage.setItem('totalHours', newTotalHours);
      }, 60000); // Update every minute
    }
    return () => clearInterval(interval);
  }, [isClocked, clockInTime]);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
  };

  const handleLogout = () => {
    // Clear all stored data
    localStorage.removeItem('selectedLanguage');
    localStorage.removeItem('clockedIn');
    localStorage.removeItem('clockInTime');
    localStorage.removeItem('totalHours');
    navigate('/login-authentication');
  };

  const handleClockIn = async () => {
    setIsLoading(true);
    try {
      // Simulate facial recognition processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const now = new Date();
      const timeString = now?.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      setIsClocked(true);
      setClockInTime(timeString);
      setTotalHours('0h 00m');
      
      // Save to localStorage
      localStorage.setItem('clockedIn', 'true');
      localStorage.setItem('clockInTime', now?.toISOString());
      localStorage.setItem('totalHours', '0h 00m');
      
      // Show success notification (you can implement toast here)
      console.log('Clock in successful');
    } catch (error) {
      console.error('Clock in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClockOut = async () => {
    setIsLoading(true);
    try {
      // Simulate facial recognition processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsClocked(false);
      
      // Clear localStorage
      localStorage.removeItem('clockedIn');
      localStorage.removeItem('clockInTime');
      localStorage.removeItem('totalHours');
      
      // Reset state
      setClockInTime(null);
      setTotalHours('0h 00m');
      
      // Show success notification
      console.log('Clock out successful');
    } catch (error) {
      console.error('Clock out failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
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
        userRole="employee"
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        currentLanguage={currentLanguage}
      />

      {/* Main Content */}
      <main className={`transition-smooth ${
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-70'
      } pt-16`}>
        {/* Breadcrumbs */}
        <NavigationBreadcrumbs
          currentLanguage={currentLanguage}
          userRole="employee"
        />

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Quick Stats Widgets */}
          <QuickStatsWidgets
            currentLanguage={currentLanguage}
            weeklyHours="32h 15m"
            monthlyAttendance={95}
          />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Facial Recognition Panel - Left Section */}
            <div className="xl:col-span-8">
              <FacialRecognitionPanel
                currentLanguage={currentLanguage}
                onClockIn={handleClockIn}
                onClockOut={handleClockOut}
                isClocked={isClocked}
                isLoading={isLoading}
              />
            </div>

            {/* Right Section */}
            <div className="xl:col-span-4 space-y-6">
              {/* Today's Summary */}
              <TodaySummaryCard
                currentLanguage={currentLanguage}
                clockInTime={clockInTime}
                totalHours={totalHours}
                currentStatus={isClocked ? 'in' : 'out'}
                isClocked={isClocked}
              />
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="grid grid-cols-1">
            <RecentActivityTimeline
              currentLanguage={currentLanguage}
            />
          </div>
        </div>
      </main>

      {/* Quick Action FAB for Mobile */}
      <QuickActionFab
        userRole="employee"
        currentLanguage={currentLanguage}
        onClockIn={handleClockIn}
        onClockOut={handleClockOut}
        isClocked={isClocked}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EmployeeDashboard;