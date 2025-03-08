import RegisterStudent from "../components/RegisterStudent";
import RegisterCanteenOwner from "../components/RegisterCanteenOwner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Redirect user after successful registration
    navigate(role === "student" ? "/student-dashboard" : "/canteen-dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white bg-opacity-30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          Register
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

        {/* Registration Form */}
        {role === "student" ? (
          <RegisterStudent onSuccess={handleSuccess} />
        ) : (
          <RegisterCanteenOwner onSuccess={handleSuccess} />
        )}
      </div>
    </div>
  );
};

export default Register;
