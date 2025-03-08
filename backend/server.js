require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Handle form data
app.use(cors());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database connection
const db = require("./config/mongooseConnnection.js");

// Routes
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const canteenOwnerRoutes = require("./routes/canteenOwnerRoutes");

app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/canteen", canteenOwnerRoutes);

// Sample Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
