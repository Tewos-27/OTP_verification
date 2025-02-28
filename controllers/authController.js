const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


// email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tewodrosshimels268@gmail.com',
        pass: 'Tewo@1921'
    }
})

// generate OTP

const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// register User and send Otp

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

exports.verifyOTP = async (req,res) => {
    try{
        
    }
}


