// src/components/CanteenList.jsx
import React, { useState, useEffect } from "react";
import { getAllFoodItems } from "../services/api";
import { useNavigate } from "react-router-dom";

const CanteenList = () => {
  const [canteenOwners, setCanteenOwners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllFoodItems({})
      .then((data) => {
        const uniqueCanteenOwners = [...new Set(data.map(item => item.canteenOwner.shopName))];
        setCanteenOwners(uniqueCanteenOwners);
      })
      .catch((error) => {
        console.error("Error fetching canteen owners:", error);
      });
  }, []);

  const handleCanteenClick = (shopName) => {
    navigate(`/canteen/${shopName}`);
  };

  return (
    <div>
      <h2>Canteen Owners</h2>
      <ul>
        {canteenOwners.map((owner, index) => (
          <li key={index} onClick={() => handleCanteenClick(owner)}>
            {owner}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CanteenList; // Correct export
