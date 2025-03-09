import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import CanteenDashboard from "./pages/CanteenDashboard";
import React from "react";
import Dashboard from "./pages/Dashboard";
import Subscription from "./components/Subscription";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/canteen-dashboard" element={<CanteenDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </Router>
  );
}

export default App;
