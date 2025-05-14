const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// generate OTP
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// register User and send Otp
// This function handles user registration and sends an OTP to the user's email for verification
// It first checks if the user already exists in the database by searching for the email
// If the user exists, it returns a 400 status with an error message
// If the user does not exist, it generates a new OTP and sets an expiry time for the OTP

exports.register = async (req, res) => {
    try{
        
        const { name, email, password } =req.body;
        let user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: 'User already exists'});
        
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user = new User({ name, email, password, otp, otpExpiry});
        await user.save();

        await transporter.sendMail({
            from: 'tewodrosshimels268@gmail.com',
            to: email,
            subject: 'otp verification',
            text: `your OTP is: ${otp}`

        });
        res.status(201).json({ message: 'user Register, please verify OTP sent to email.'});
    } catch(error){
        res.status(500). json({ message: 'Error registering user', error});
    }
};
// verify OTP
// This function verifies the OTP sent to the user's email
// It first checks if the user exists in the database by searching for the email

exports.verifyOTP = async (req,res) => {
    try{
        const { email, otp} = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: ' user not found '});
        if (user.isVerified) return res.status(400).json({ message: 'User already verified!' });

        if (user.otp !== otp || user.otpExpiry < new Date()){
            return res.status(400).json({ message: 'Invalid or expired OTP'});
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({ message: 'Email verified successfully. you can login!'});
    } catch (error){
       res.status(500).json({ message: 'Error verifi\ying OTP', error});
    } 
};

// Resend OTP
// This function resends the OTP to the user's email
// It first checks if the user exists in the database by searching for the email
// If the user does not exist, it returns a 400 status with an error message
exports.resendOTP = async (req, res) => {
    try{
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'user not found!'});
        if (user.isVerified) return res.status(400).json({ message: 'User already verified!' });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();
        await transporter.sendMail({
            from: 'tewodrosshimels268@gmail.com',
            to: email,
            subject: ' Resend OTP Verification',
            text: `Your new OTP is: ${otp}`
        });  
        res.json({ message: 'OTP resent successfully'});
    } catch (error){
        res.status(500).json({ message: 'Error resending OTP', error});
    }
};

// Login user 
// This function handles user login
// It first checks if the user exists in the database by searching for the email
// If the user does not exist, it returns a 400 status with an error message
// If the user exists, it checks if the password is correct by comparing the hashed password in the database with the provided password
exports.login = async (req, res) => {
    try{
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if(!user)
        return res.status(400).json({ message: 'User not found'});
      if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      if (!user.IsVerified){
        return res.status(400).json({ message: 'Email is not verified. Pleasse verify OTP '});
      }

      req.session.user = { id: user._id, email: user.email, name: user.name};
      res.json({ messsage: 'Login successful'});

    } catch(error){
        res.status(500).json({ message: 'Error logging in', error });
    }
    
};
// Logout user 
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(500).json({ message: 'Error logging out'});
        res.json({ message: 'Logged out successfully'});
    });
};

// Dashboard (protected route)
// This function handles the dashboard route
// It checks if the user is authenticated by checking if the user object exists in the session
exports.dashboard = async (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    res.json({ message: `Welcome to the dashboard, ${req.session.user.name}` });
};