import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout, onHealthyFilter, onSubscription }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center cursor-pointer">
        <div className="text-xl font-semibold">Student Dashboard</div>
        <div className="space-x-6">
          <button onClick={onHealthyFilter} className="bg-green-500 px-4 py-2 rounded-lg">
            Healthy Options
          </button>
          <button onClick={onSubscription} className="bg-blue-500 text-white px-4 py-2 rounded">
            Subscription
          </button>
          <button onClick={onLogout} className="bg-red-500 px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
