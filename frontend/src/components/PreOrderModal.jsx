import React, { useState } from 'react';
import axios from 'axios';

const PreOrderModal = ({ foodItem, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [preOrderDate, setPreOrderDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePreOrder = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!preOrderDate) {
      setErrorMessage('Pre-order date is required.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/pre-order',
        {
          foodItemId: foodItem._id,
          quantity,
          preOrderDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSuccessMessage(response.data.message);
      onClose(); // Close the modal on success
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error placing pre-order.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Place Pre-Order for {foodItem.name}</h2>

        {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mb-2">{successMessage}</div>}

        <form onSubmit={handlePreOrder}>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-semibold">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="preOrderDate" className="block text-sm font-semibold">Pre-Order Date</label>
            <input
              type="datetime-local"
              id="preOrderDate"
              value={preOrderDate}
              onChange={(e) => setPreOrderDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Place Pre-Order
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreOrderModal;
