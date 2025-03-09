import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Subscription = () => {
  const [plan, setPlan] = useState('');
  const [months, setMonths] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handlePlanChange = (e) => {
    setPlan(e.target.value);
  };

  const handleMonthsChange = (e) => {
    setMonths(e.target.value);
  };

  const handleSubscribe = async () => {
    if (!plan || !months || months < 1) {
      setMessage("Please select a valid subscription plan and duration.");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/subscribe', 
        { plan, months },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error during subscription.");
      console.error(error);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Navigate to Subscription Page
  const handleSubscriptionClick = () => {
    navigate('/subscription');
  };

  // Toggle Healthy Food Filter (Functionality placeholder)
  const handleHealthyFilter = () => {
    console.log("Healthy food filter clicked (Functionality to be implemented)");
  };

  return (
    <>
      <Navbar onLogout={handleLogout} onHealthyFilter={handleHealthyFilter} onSubscription={handleSubscriptionClick} />
      <div className="bg-gray-100 p-6 rounded-md shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Subscribe to a Plan</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Select Subscription Plan</label>
            <select
              value={plan}
              onChange={handlePlanChange}
              className="border-2 border-gray-300 p-2 rounded-lg w-full"
            >
              <option value="">Select a Plan</option>
              <option value="Basic">Basic Plan</option>
              <option value="Premium">Premium Plan</option>
              <option value="Gold">Gold Plan</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Enter Number of Months</label>
            <input
              type="number"
              value={months}
              onChange={handleMonthsChange}
              className="border-2 border-gray-300 p-2 rounded-lg w-full"
              min="1"
            />
          </div>

          <button
            onClick={handleSubscribe}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
          >
            Subscribe
          </button>

          {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        </div>
      </div>
    </>
  )
};

export default Subscription;
