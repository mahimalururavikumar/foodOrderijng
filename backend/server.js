require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json()); // This line is required to parse JSON requests
app.use(express.urlencoded({ extended: true })); // This helps with form data
app.use(cors());

// Database connection
const db = require("./config/mongooseConnnection");

// Routes
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);

// Sample Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
