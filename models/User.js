// User model for MongoDB
const mongoose = require('mongoose');
// Create a schema for the User model
// This schema defines the structure of the user document in the MongoDB collection
// The schema includes fields for name, email, password, otp, otpExpiry, and IsVerified
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