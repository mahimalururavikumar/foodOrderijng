// models/FoodItem.js
const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String }, // Image URL
    canteenOwner: { type: mongoose.Schema.Types.ObjectId, ref: "CanteenOwner", required: true },
    outOfStock: { type: Boolean, default: false },
    healthy: { type: Boolean, default: false },
    vegetarian: { type: Boolean, default: false }, // New field to filter vegetarian items
}, { timestamps: true });

module.exports = mongoose.model("FoodItem", FoodItemSchema);
