import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(formData, role);
      console.log("Login successful:", response.data);

      // Redirect to respective dashboard
      navigate(role === "student" ? "/student-dashboard" : "/canteen-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#fbc2eb] to-[#a6c1ee] p-6">
      <div className="bg-white bg-opacity-30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          Login
        </h1>

        {/* Role Selection */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setRole("student")}
            className={`px-6 py-3 rounded-l-full font-semibold ${
              role === "student" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole("canteen_owner")}
            className={`px-6 py-3 rounded-r-full font-semibold ${
              role === "canteen_owner" ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            Canteen Owner
          </button>
        </div>

        {/* Login Form */}
        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            required
          />
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
