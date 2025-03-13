import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const mockUser = {
        name: "John Doe",
        role: "Admin",
      };

      setUserDetails(mockUser);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="bg-gradient-to-r from-indigo-800 via-teal-700 to-gray-900 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full p-8 bg-gradient-to-br from-indigo-600 to-teal-700 rounded-3xl shadow-xl">
        <h1 className="text-5xl font-bold text-center text-purple-300 mb-8">Welcome to Your Dashboard</h1>
        {userDetails ? (
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white mb-4">Welcome, {userDetails.name}!</h2>
            <p className="text-xl text-gray-200 mb-8">Role: {userDetails.role}</p>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-semibold rounded-full shadow-md hover:bg-gradient-to-l hover:from-teal-700 hover:to-indigo-700 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center text-red-600">User details not found.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
