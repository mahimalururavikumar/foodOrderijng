import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/user/order-history")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching order history", error));
  }, []);

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold">Order History</h2>
      <div className="space-y-4 mt-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded shadow-md">
            <h3 className="font-semibold">Order #{order._id}</h3>
            <p>Status: {order.status}</p>
            <p>Total: ${order.totalPrice}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Food Item: {order.foodItem.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
