// models/Order.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "Pending" }, // Status of the order (e.g., Pending, Completed, etc.)
    orderDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
