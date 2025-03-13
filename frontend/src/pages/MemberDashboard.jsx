import React, { useState, useEffect } from 'react';

const MemberDashboard = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const mockSessions = [
      { id: 1, name: "Yoga Class" },
      { id: 2, name: "Cardio Training" },
      { id: 3, name: "Strength Training" }
    ];
    setSessions(mockSessions);
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-900 via-indigo-800 to-black min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full p-8 bg-gradient-to-r from-indigo-700 to-teal-600 rounded-3xl shadow-xl">
        <h1 className="text-5xl font-bold text-center text-cyan-300 mb-8">Member Dashboard</h1>
        <h2 className="text-2xl text-white text-center mb-6">Available Sessions</h2>
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li
              key={session.id}
              className="p-6 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {session.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemberDashboard;
