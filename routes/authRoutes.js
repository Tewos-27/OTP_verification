const express = require('express');
const { register, verifyOTP, resendOTP, login, logout, dashboard} = require('../controllers/authController');
const authMiddleware = require('../middleware/authmiddleware');

// create router using express
// This code creates a new router object using the express.Router() method

const router = express.Router();
 // This code defines the routes for user authentication
//  The routes include registration, OTP verification, login, logout, and dashboard access
router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', login);
router.post('/logout', logout);
router.get('/dashboard', authMiddleware, dashboard);
// This code defines a middleware function called authMiddleware
// This code exports the router object so it can be used in other parts of the application
module.exports = router;