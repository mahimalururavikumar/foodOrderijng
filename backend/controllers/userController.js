const FoodItem = require("../models/FoodItem");
const Order = require("../models/Order");
const Subscription = require("../models/Subscription");

// 1. Get All Food Items (with optional health/vegetarian filter)
const getHealthyFood = async (req, res) => {
    try {
        const { healthy = "true", vegetarian = "true" } = req.query;

        let filters = {};

        // Filter based on healthy and vegetarian query parameters
        if (healthy !== undefined) filters.healthy = healthy === "true";
        if (vegetarian !== undefined) filters.vegetarian = vegetarian === "true";

        const foodItems = await FoodItem.find(filters);

        if (!foodItems.length) {
            return res.status(404).json({ message: "No food items found matching the filters." });
        }

        res.status(200).json(foodItems);
    } catch (error) {
        console.error("Error fetching food items:", error);
        res.status(500).json({ message: "Server error while fetching food items", error: error.message });
    }
};

// 2. Place an Order
const placeOrder = async (req, res) => {
    try {
        const { foodItemId, quantity } = req.body;

        // Check if food item exists
        const foodItem = await FoodItem.findById(foodItemId);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }

        // Validate quantity
        if (quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be greater than zero." });
        }

        const totalPrice = foodItem.price * quantity;
        const newOrder = new Order({
            foodItem: foodItemId,
            student: req.user.id,
            quantity,
            totalPrice
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Server error while placing order", error: error.message });
    }
};

// 3. Get Order History
const getOrderHistory = async (req, res) => {
    try {
        const orders = await Order.find({ student: req.user.id }).populate("foodItem");
        if (!orders.length) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching order history:", error);
        res.status(500).json({ message: "Server error while fetching order history", error: error.message });
    }
};

// 4. Pre-order Booking
const preOrderBooking = async (req, res) => {
    try {
        const { foodItemId, quantity, preOrderDate } = req.body;

        // Check if food item exists
        const foodItem = await FoodItem.findById(foodItemId);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }

        // Validate quantity and pre-order date
        if (quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be greater than zero." });
        }

        const totalPrice = foodItem.price * quantity;

        // Check if pre-order date is valid
        if (new Date(preOrderDate) <= new Date()) {
            return res.status(400).json({ message: "Pre-order date must be in the future." });
        }

        const preOrder = new Order({
            foodItem: foodItemId,
            student: req.user.id,
            quantity,
            totalPrice,
            orderDate: new Date(preOrderDate),
            status: "Pre-Ordered"
        });

        await preOrder.save();
        res.status(201).json({ message: "Pre-order placed successfully", order: preOrder });
    } catch (error) {
        console.error("Error placing pre-order:", error);
        res.status(500).json({ message: "Server error while placing pre-order", error: error.message });
    }
};

// 5. Subscribe to Meal Plan
const subscribe = async (req, res) => {
    try {
        const { plan, months } = req.body;

        // Validate inputs
        if (!plan || !months || months < 1) {
            return res.status(400).json({ message: "Valid subscription plan and months are required." });
        }

        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + months * 30); // End date based on months

        const newSubscription = new Subscription({
            student: req.user.id,
            plan,
            startDate,
            endDate,
        });

        await newSubscription.save();
        res.status(201).json({ message: "Subscription successful", subscription: newSubscription });
    } catch (error) {
        console.error("Error subscribing:", error);
        res.status(500).json({ message: "Server error while subscribing", error: error.message });
    }
};


const  getAllFoodItems = async (req, res) => {
    try {

        const foodItems = await FoodItem.find();
        if (!foodItems.length) {
            return res.status(404).json({ message: "No food items found." });
        }

        res.status(200).json(foodItems);
    } catch (error) {
        console.error("Error fetching food items:", error);
        res.status(500).json({ message: "Server error while fetching food items", error: error.message });
    }
};


module.exports = {
    getAllFoodItems,
    placeOrder,
    getOrderHistory,
    preOrderBooking,
    subscribe,
    getHealthyFood
};
