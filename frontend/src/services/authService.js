import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth"; // Ensure this matches backend

export const registerStudent = async (userData) => {
  return await axios.post(`${API_BASE_URL}/register/user`, userData);
};

export const registerCanteenOwner = async (ownerData) => {
  return await axios.post(`${API_BASE_URL}/register/canteen-owner`, ownerData);
};

export const loginUser = async (loginData, role) => {
    const endpoint = role === "student" ? "/login/user" : "/login/canteen-owner";
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, loginData);
  
    // Store user role and token in local storage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", role);
  
    return response;
  };
