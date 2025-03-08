import { useState } from "react";
import { registerCanteenOwner } from "../services/authService";
import { useNavigate } from "react-router-dom";

const RegisterCanteenOwner = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", canteenName: "", location: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await registerCanteenOwner(formData);
      console.log("Registered successfully:", response.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="transition-opacity duration-500 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Canteen Owner Registration</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 outline-none" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 outline-none" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 outline-none" required />
        <input type="text" name="canteenName" placeholder="Canteen Name" value={formData.canteenName} onChange={handleChange} className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 outline-none" required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 outline-none" required />
        <button type="submit" className="w-full py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition-all duration-300">
          Register
        </button>
      </form>
      <p className="text-center text-gray-700 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </a>
        </p>
    </div>
  );
};

export default RegisterCanteenOwner;
