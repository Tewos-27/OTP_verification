const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


// email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
})

// generate OTP

const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// register User and send Otp

