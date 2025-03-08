const express = require('express');
const { registerUser, registerCanteenOwner, loginUser, loginCanteenOwner } = require('../controllers/authControllers.js');

const router = express.Router();

// Student Authentication Routes
router.post('/register/user', registerUser);
router.post('/login/user', loginUser);

// Canteen Owner Authentication Routes
router.post('/register/canteen-owner', registerCanteenOwner);
router.post('/login/canteen-owner', loginCanteenOwner);

module.exports = router;
