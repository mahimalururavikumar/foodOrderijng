// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CanteenOwner = require("../models/CanteenOwner");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    console.log("Received Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided or invalid format." });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
    console.log("Extracted Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        let user = await User.findById(decoded.id).select("-password");
        if (!user) {
            user = await CanteenOwner.findById(decoded.id).select("-password");
        }

        if (!user) {
            console.log("User not found in DB");
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Ensure role is set
        req.user = {
            id: user._id,
            email: user.email,
            role: decoded.role || user.role
        };

        next();
    } catch (err) {
        console.log("Token verification failed:", err.message);
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
