import React, { useState, useEffect } from "react";
import axios from "axios";

const FoodItemsList = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    axios.get("/api/user/food-items")
      .then((response) => setFoodItems(response.data))
      .catch((error) => console.error("Error fetching food items", error));
  }, []);

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold">Food Items</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {foodItems.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded shadow-md">
            <img src={`/uploads/${item.image}`} alt={item.name} className="w-full h-32 object-cover rounded"/>
            <h3 className="mt-2 font-semibold">{item.name}</h3>
            <p className="text-sm">{item.description}</p>
            <p className="text-lg font-semibold mt-2">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodItemsList;
