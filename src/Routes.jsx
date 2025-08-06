import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AttendanceReports from './pages/attendance-reports';
import EmployeeDashboard from './pages/employee-dashboard';
import EmployeeManagement from './pages/employee-management';
import LoginAuthentication from './pages/login-authentication';
import PersonalAttendanceHistory from './pages/personal-attendance-history';
import HRAdminDashboard from './pages/hr-admin-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AttendanceReports />} />
        <Route path="/attendance-reports" element={<AttendanceReports />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee-management" element={<EmployeeManagement />} />
        <Route path="/login-authentication" element={<LoginAuthentication />} />
        <Route path="/personal-attendance-history" element={<PersonalAttendanceHistory />} />
        <Route path="/hr-admin-dashboard" element={<HRAdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
