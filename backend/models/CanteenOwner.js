const mongoose = require("mongoose");

const CanteenOwnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    canteenName: { type: String, required: true },
    location: { type: String, required: true },
    
  }, { timestamps: true });
  
module.exports = mongoose.model('CanteenOwner', CanteenOwnerSchema);