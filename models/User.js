const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    otp: { type: String }, //otp for verification
    otpExpiry: { type: Date }, // Expired time for otp
    IsVerified: { type: Boolean, default: false } // email verification status
});

const User = mongoose.model('User', UserSchema);
// Export the User modelS
module.exports = User;