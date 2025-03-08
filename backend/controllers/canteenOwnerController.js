const FoodItem = require("../models/FoodItem");

// Get all items uploaded by the canteen owner
const getAllItems = async (req, res) => {
    console.log("Fetching items for user ID:", req.user.id);  // Log the user ID
    try {
        const items = await FoodItem.find({ canteenOwner: req.user.id });

        if (!items || items.length === 0) {
            return res.status(404).json({ message: "No items available for this canteen owner." });
        }

        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: "Server error while fetching items", error: error.message });
    }
};

// Upload a new food item
const uploadItem = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const { name, price, description,healthy } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: "Name and price are required fields" });
        }

        const imageUrl =  `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        const newItem = new FoodItem({
            name,
            price,
            description,
            imageUrl,
            canteenOwner: req.user.id,
            healthy: healthy === "true",
        });

        await newItem.save();
        res.status(201).json({ message: "Item uploaded successfully", item: newItem });
    } catch (error) {
        console.error("Error uploading item:", error);
        res.status(500).json({ message: "Server error while uploading item", error: error.message });
    }
};

// Mark an item as out of stock
const markOutOfStock = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Item ID is required" });
        }

        const item = await FoodItem.findById(id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        console.log("Item Canteen Owner ID:", item.canteenOwner.toString());
        console.log("Logged-in Canteen Owner ID:", req.user.id);

        if (item.canteenOwner.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own items" });
        }

        item.outOfStock = true;
        await item.save();

        res.status(200).json({ message: "Item marked as out of stock", item });
    } catch (error) {
        console.error("Error marking item as out of stock:", error);
        res.status(500).json({ message: "Server error while updating item", error: error.message });
    }
};
// Adding an item to stock
const addToStock = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Item ID is required" });
        }

        const item = await FoodItem.findById(id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        console.log("Item Canteen Owner ID:", item.canteenOwner.toString());
        console.log("Logged-in Canteen Owner ID:", req.user.id);

        if (item.canteenOwner.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own items" });
        }

        if (!item.outOfStock) {
            return res.status(400).json({ message: "Item is already in stock" });
        }

        item.outOfStock = false;
        await item.save();

        res.status(200).json({ message: "Item is back in stock", item });
    } catch (error) {
        console.error("Error adding item to stock:", error);
        res.status(500).json({ message: "Server error while updating item", error: error.message });
    }
};


// Logout (frontend should handle token removal)
const logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Server error while logging out", error: error.message });
    }
};



module.exports = { getAllItems, uploadItem, markOutOfStock, logout, addToStock };
