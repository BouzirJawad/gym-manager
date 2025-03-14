import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Use Navigate for redirection
import Connect from "./pages/Connect";
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
    const token = sessionStorage.getItem("authToken") // or use any other method for authentication
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
  const ProtectedRoute = ({ element, coachOnly = false }) => {
    const user = JSON.parse(sessionStorage.getItem("User"))

    if (!isAuthenticated){
      return <Navigate to="/Connect" />
    }

    if (coachOnly && !user?.isCoach) {
      return <Navigate to="/dashboard" />
    }

    return element;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/Connect" element={<Connect />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
        <Route path="/member-dashboard" element={<ProtectedRoute element={<MemberDashboard />} />} />
        <Route path="/trainer-dashboard" element={<ProtectedRoute element={<TrainerDashboard />} coachOnly />} />
        <Route path="/booking/:sessionId" element={<ProtectedRoute element={<BookingPage />} />} />

        {/* Error Page (for undefined routes) */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App
