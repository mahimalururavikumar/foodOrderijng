import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PreOrderModal from '../components/PreOrderModal';
import OrderModal from '../components/OrderModal';

const Dashboard = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [healthyFilter, setHealthyFilter] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isPreOrderModalOpen, setIsPreOrderModalOpen] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  
  const navigate = useNavigate();

  // Fetch food items initially
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/user/food-items', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        setFoodItems(response.data);
        setFilteredFoodItems(response.data); // Default to all food items
      })
      .catch((error) => console.log('Error fetching food items:', error));
  }, []);

  // Toggle Healthy Food Filter
  const handleHealthyFilter = () => {
    setHealthyFilter((prev) => !prev);

    if (!healthyFilter) {
      axios
        .get('http://localhost:5000/api/user/healthyFood', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((response) => {
          setFilteredFoodItems(response.data);
        })
        .catch((error) => console.log('Error fetching healthy food items:', error));
    } else {
      setFilteredFoodItems(foodItems);
    }
  };

  // Navigate to Subscription Page
  const handleSubscriptionClick = () => {
    navigate('/subscription');
  };

  // Handle Order Modal
  const openOrderModal = (foodItem) => {
    setSelectedFoodItem(foodItem);
    setIsOrderModalOpen(true);
  };
  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedFoodItem(null);
  };

  // Handle Pre-Order Modal
  const openPreOrderModal = (foodItem) => {
    setSelectedFoodItem(foodItem);
    setIsPreOrderModalOpen(true);
  };
  const closePreOrderModal = () => {
    setIsPreOrderModalOpen(false);
    setSelectedFoodItem(null);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar 
        onLogout={handleLogout} 
        onHealthyFilter={handleHealthyFilter} 
        onSubscription={handleSubscriptionClick} 
      />

      {/* Main Content */}
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-semibold text-center mb-6">Food Items</h1>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoodItems.length > 0 ? (
            filteredFoodItems.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
                <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-lg" />
                <h3 className="text-lg font-semibold mt-4">{item.name}</h3>
                <p>{item.description}</p>
                <p className="text-gray-500">${item.price}</p>
                <button onClick={() => openOrderModal(item)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
                  Order
                </button>
                <button onClick={() => openPreOrderModal(item)} className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md">
                  Pre-Order
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No food items available</p>
          )}
        </div>
      </div>

      {/* Modals */}
      {isOrderModalOpen && <OrderModal foodItem={selectedFoodItem} onClose={closeOrderModal} />}
      {isPreOrderModalOpen && <PreOrderModal foodItem={selectedFoodItem} onClose={closePreOrderModal} />}
    </div>
  );
};

export default Dashboard;
