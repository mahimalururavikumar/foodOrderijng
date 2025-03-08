// controllers/authController.js
const User = require('../models/User');
const CanteenOwner = require('../models/CanteenOwner');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register User (Student)
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role: 'student' });
        await newUser.save();

        const token = generateToken(newUser._id, newUser.email, 'student');

        res.status(201).json({ 
            message: 'User registered successfully', 
            token, 
            user: { id: newUser._id, name, email, role: 'student' } 
        });
    } catch (error) {
        console.error("Register User Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Register Canteen Owner
exports.registerCanteenOwner = async (req, res) => {
    try {
        const { name, email, password, canteenName, location } = req.body;
        if (!name || !email || !password || !canteenName || !location) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingOwner = await CanteenOwner.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({ message: 'Canteen owner already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newOwner = new CanteenOwner({ name, email, password: hashedPassword, canteenName, location, role: 'canteen_owner' });
        await newOwner.save();

        const token = generateToken(newOwner._id, newOwner.email, 'canteen_owner');

        res.status(201).json({ 
            message: 'Canteen owner registered successfully', 
            token, 
            user: { id: newOwner._id, name, email, role: 'canteen_owner' } 
        });
    } catch (error) {
        console.error("Register Canteen Owner Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login User (Student)
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id, user.email, 'student');

        res.json({ token, user: { id: user._id, name: user.name, email, role: 'student' } });
    } catch (error) {
        console.error("Login User Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login Canteen Owner
exports.loginCanteenOwner = async (req, res) => {
    try {
        const { email, password } = req.body;

        const owner = await CanteenOwner.findOne({ email });
        if (!owner) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(owner._id, owner.email, 'canteen_owner');

        res.json({ token, user: { id: owner._id, name: owner.name, email, role: 'canteen_owner' } });
    } catch (error) {
        console.error("Login Canteen Owner Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
