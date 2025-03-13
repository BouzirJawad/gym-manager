import React, { useState, useEffect } from 'react';

const TrainerDashboard = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const mockSessions = [
      { id: 1, name: "Yoga Class" },
      { id: 2, name: "Strength Training" }
    ];
    setSessions(mockSessions);
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full p-8 bg-gray-800 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-semibold text-center text-indigo-300 mb-6">Trainer Dashboard</h1>
        <h2 className="text-2xl font-medium mb-6 text-center text-gray-300">My Sessions</h2>
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li
              key={session.id}
              className="p-4 bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 cursor-pointer transform transition-all duration-300"
            >
              {session.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrainerDashboard;
