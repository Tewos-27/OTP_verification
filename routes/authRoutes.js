
const express = require('express');
const { register, verifiyOTP, resendOTP, login, logout, dashboard } = require('../controllers/authControllers');
const authMiddleware = require('../middleware/authmiddleware');
const { verifyOTP } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', login);
router.post('/logout', logout);
router.get('/dashboard', authMiddleware, dashboard);

module.exports = router;