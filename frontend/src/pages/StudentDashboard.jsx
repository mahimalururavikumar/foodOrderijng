import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#FFDEE9] to-[#B5FFFC] p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Student Dashboard</h1>
        <p className="text-center text-gray-600">Welcome, Student! Explore the food ordering system.</p>
        <button 
          onClick={handleLogout} 
          className="mt-6 w-full py-3 bg-red-500 text-white font-bold rounded-xl shadow-md hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
