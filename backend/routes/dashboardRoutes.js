const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Student Dashboard Route
router.get("/dashboard/student", authMiddleware, (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Access denied. Not a student." });
  }
  res.json({
    message: "Welcome to the Student Dashboard!",
    user: req.user,
  });
});

// Canteen Owner Dashboard Route
router.get("/dashboard/canteen", authMiddleware, (req, res) => {
  if (req.user.role !== "canteen_owner") {
    return res.status(403).json({ message: "Access denied. Not a canteen owner." });
  }
  res.json({
    message: "Welcome to the Canteen Owner Dashboard!",
    user: req.user,
  });
});

module.exports = router;
