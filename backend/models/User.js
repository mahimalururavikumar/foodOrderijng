// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }, // Link to subscription
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // Link to orders
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
