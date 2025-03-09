const express = require("express");
const { getAllFoodItems, placeOrder, getOrderHistory, preOrderBooking, subscribe ,getHealthyFood} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all food items with optional filters
router.get("/food-items", authMiddleware, getAllFoodItems);

// Place an order
router.post("/place-order", authMiddleware, placeOrder);

// Get order history
router.get("/order-history", authMiddleware, getOrderHistory);

// Pre-order food for future date
router.post("/pre-order", authMiddleware, preOrderBooking);

// Subscribe to meal plan
router.post("/subscribe", authMiddleware, subscribe);

router.get("/healthyFood", authMiddleware, getHealthyFood);

module.exports = router;