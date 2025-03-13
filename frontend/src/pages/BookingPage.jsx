import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const getSessionDetails = async (sessionId) => {
  try {
    const response = await fetch(`/api/sessions/${sessionId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching session details:", error);
    return null;
  }
};

const bookSession = async (sessionId, userId) => {
  try {
    const response = await fetch(`/api/sessions/book`, {
      method: "POST",
      body: JSON.stringify({ sessionId, userId }),
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error("Error booking session:", error);
    return null;
  }
};

const BookingPage = () => {
  const [sessionDetails, setSessionDetails] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const { sessionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      const details = await getSessionDetails(sessionId);
      setSessionDetails(details);
    };
    fetchSessionDetails();
  }, [sessionId]);

  const handleBooking = async () => {
    const userId = 123;
    const result = await bookSession(sessionId, userId);
    setBookingStatus(result ? "Booking Successful!" : "Booking Failed");
    if (result) navigate("/member-dashboard");
  };

  return (
    <div className="bg-gradient-to-r from-indigo-900 via-purple-800 to-black min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full p-8 bg-gradient-to-r from-purple-800 via-indigo-900 to-black rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
        <h1 className="text-5xl font-extrabold text-center text-cyan-300 mb-6">Book Your Session</h1>
        {sessionDetails ? (
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white mb-4">{sessionDetails.name}</h2>
            <button
              onClick={handleBooking}
              className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-700 transform transition-all duration-300 ease-in-out"
            >
              Book Session
            </button>
            {bookingStatus && (
              <p className="mt-4 text-lg text-teal-400 font-medium">{bookingStatus}</p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-400">Loading session details...</p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
