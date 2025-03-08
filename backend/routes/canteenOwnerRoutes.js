const express = require("express");
const { getAllItems, uploadItem, markOutOfStock, logout, addToStock} = require("../controllers/canteenOwnerController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Get all uploaded items
router.get("/items", authMiddleware, getAllItems);

// Upload a new item with an image
router.post("/upload", authMiddleware, upload.single("image"), uploadItem);

// Mark an item as out of stock
router.put("/out-of-stock/:id", authMiddleware, markOutOfStock);

//Adding item to stock
router.put("/add-to-stock/:id", authMiddleware, addToStock);

// Logout (handled on frontend by clearing the token)
router.post("/logout", authMiddleware, logout);

module.exports = router;
