import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Use Navigate for redirection
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MemberDashboard from './pages/MemberDashboard';
import TrainerDashboard from './pages/TrainerDashboard';
import BookingPage from './pages/BookingPage';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  // Simple state to check if the user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to simulate checking if the user is logged in
  const checkAuthentication = () => {
    const token = localStorage.getItem("authToken"); // or use any other method for authentication
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    } 
  };

  useEffect(() => {
    checkAuthentication();
  }, []); // Check authentication status when the app loads

  // ProtectedRoute component that redirects if not authenticated
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
        <Route path="/member-dashboard" element={<ProtectedRoute element={<MemberDashboard />} />} />
        <Route path="/trainer-dashboard" element={<ProtectedRoute element={<TrainerDashboard />} />} />
        <Route path="/booking/:sessionId" element={<ProtectedRoute element={<BookingPage />} />} />

        {/* Error Page (for undefined routes) */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
