// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

export const getAllFoodItems = async (filters) => {
  try {
    const response = await axios.get(`${API_URL}/food-items`, { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error fetching food items:", error);
    throw error;
  }
};

export const placeOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/place-order`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export const getOrderHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/order-history`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};

export const preOrderBooking = async (preOrderData) => {
  try {
    const response = await axios.post(`${API_URL}/pre-order`, preOrderData);
    return response.data;
  } catch (error) {
    console.error("Error placing pre-order:", error);
    throw error;
  }
};

export const subscribe = async (subscriptionData) => {
  try {
    const response = await axios.post(`${API_URL}/subscribe`, subscriptionData);
    return response.data;
  } catch (error) {
    console.error("Error subscribing:", error);
    throw error;
  }
};
