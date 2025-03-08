import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CanteenDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({ name: "", price: "", description: "", healthy: false, image: null });
    const [uploading, setUploading] = useState(false);
    const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/canteen/items", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const markOutOfStock = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/canteen/out-of-stock/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.map(item => item._id === id ? { ...item, outOfStock: true } : item));
    } catch (error) {
      console.error("Error marking out of stock:", error);
    }
  };

  const addToStock = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/canteen/add-to-stock/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.map(item => item._id === id ? { ...item, outOfStock: false } : item));
    } catch (error) {
      console.error("Error adding item to stock:", error);
    }
  };

  const handleFileChange = (e) => {
    setNewItem({ ...newItem, image: e.target.files[0] });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("price", newItem.price);
    formData.append("description", newItem.description);
    formData.append("healthy", newItem.healthy);
    formData.append("image", newItem.image);

    try {
      const response = await axios.post("http://localhost:5000/api/canteen/upload", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setItems([...items, response.data.item]);
      setModalOpen(false);
    } catch (error) {
      console.error("Error uploading item:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <nav className="flex justify-between items-center bg-white/40 backdrop-blur-lg shadow-md p-4 rounded-xl fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-4xl z-50">
        <h1 className="text-xl font-bold">Canteen Dashboard</h1>
        <div className="flex gap-4">
          <button onClick={() => navigate("/canteen-dashboard")} className={`py-2 px-4 rounded-lg transition-all ${location.pathname === "/canteen-dashboard" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}>All Items</button>
          <button onClick={() => setModalOpen(true)} className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600">Add Item</button>
          <button onClick={handleLogout} className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600">Logout</button>
        </div>
      </nav>

      <div className="mt-20 w-full max-w-6xl p-6 flex flex-wrap justify-center gap-6">
        {loading ? <p className="text-xl text-gray-600">Loading...</p> : items.length > 0 ? items.map((item) => (
            <div key={item._id} className="bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-lg w-64 transform transition duration-300 hover:scale-105">
              <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover rounded-lg" />
              <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
              <p className="text-gray-600">${item.price}</p>
              <span className={`inline-block px-3 py-1 mt-2 rounded text-white ${item.outOfStock ? "bg-red-500" : "bg-green-500"}`}>{item.outOfStock ? "Out of Stock" : "In Stock"}</span>
              <div className="mt-3 flex gap-2">
                {item.outOfStock ? <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={() => addToStock(item._id)}>Add to Stock</button> : <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={() => markOutOfStock(item._id)}>Mark Out of Stock</button>}
              </div>
            </div>
        )) : <p className="text-xl text-gray-600 text-center">No items available.</p>}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Item</h2>
            <form onSubmit={handleAddItem} className="flex flex-col gap-3">
              <input type="text" placeholder="Name" required className="p-2 border rounded" onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
              <input type="number" placeholder="Price" required className="p-2 border rounded" onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
              <textarea placeholder="Description" className="p-2 border rounded" onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}></textarea>
              <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border rounded" />
              <button type="submit" className="py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">{uploading ? "Uploading..." : "Add Item"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanteenDashboard;
