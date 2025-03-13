import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Example simple login logic
    if (username === "admin" && password === "password") {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-teal-900 to-indigo-900">
      <div className="max-w-md w-full bg-gradient-to-br from-indigo-600 to-teal-600 p-10 rounded-3xl shadow-xl">
        <h1 className="text-5xl font-bold text-center text-pink-300 mb-6">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-lg text-gray-200">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-4 border-2 border-transparent rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg text-gray-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 border-2 border-transparent rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-l hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
