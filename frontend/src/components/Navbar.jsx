import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout...",{duration:4000})
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("User");
    setTimeout(() => {
        navigate("/Connect");
    }, 3000);
  };

  return (
    <nav className="bg-gray-600 text-white py-2 px-3 flex justify-between items-center">
        <Toaster position="top-center" />
      <p className="text-[30px]">Jk Gym</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white rounded transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
