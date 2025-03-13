import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-pink-600 via-red-700 to-black min-h-screen flex items-center justify-center p-6">
      <div className="max-w-lg w-full p-10 bg-gray-900 rounded-3xl shadow-xl text-center">
        <h2 className="text-5xl font-bold text-pink-400 mb-6">Oops! Access Denied</h2>
        <p className="text-2xl text-gray-300 mb-6">You are not authorized to access this page.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-teal-600 text-white rounded-full shadow-lg hover:bg-gradient-to-l hover:from-teal-700 hover:to-indigo-700 transition-all duration-300"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
