import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Use Navigate for redirection
import Connect from "./pages/Connect";
import CreateSession from "./pages/CreateSession";
import MemberDashboard from './pages/MemberDashboard';
import BookingPage from './pages/BookingPage';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("authToken"))

  const checkAuthentication = () => {
    const storedToken = sessionStorage.getItem("authToken")
    setToken(storedToken)
    setIsAuthenticated(!!storedToken);
  };

  useEffect(() => {
    checkAuthentication();

    const handleStorageChange = () => checkAuthentication()
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [token]); 

  const ProtectedRoute = ({ element, coachOnly = false }) => {
    const user = JSON.parse(sessionStorage.getItem("User"))

    if (!isAuthenticated){
      return <Navigate to="/Connect" />
    }

    if (coachOnly && user && !user.isCoach) {
      return <Navigate to="/member" />
    }

    return element;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/Connect" element={<Connect />} />

        {/* Protected Routes */}
        <Route path="/member" element={<ProtectedRoute element={<MemberDashboard />} />} />
        <Route path="/coach" element={<ProtectedRoute element={<CreateSession />} coachOnly />} />
        <Route path="/booking/:sessionId" element={<ProtectedRoute element={<BookingPage />} />} />

        {/* Error Page (for undefined routes) */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App
