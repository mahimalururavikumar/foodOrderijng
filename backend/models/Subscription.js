// models/Subscription.js
const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, enum: ["Basic", "Premium", "Gold"], required: true }, // Different plan types
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    active: { type: Boolean, default: true }, // Subscription status
}, { timestamps: true });

module.exports = mongoose.model("Subscription", SubscriptionSchema);
