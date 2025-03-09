// src/pages/Dashboard.jsx
import React from "react";
import Navbar from "../components/Navbar";
import CanteenList from "../components/CanteenList";  // Correct import

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to Student Dashboard</h1>
      <CanteenList />
    </div>
  );
};

export default Dashboard;
