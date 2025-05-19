const express = require('express');
const connectDB = require('./config/db');
const session = require('express-session');

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json()); // Middleware to parse JSON
// Middleware to parse URL-encoded data
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true,  // Fixed typo
    cookie: { secure: false }
}));

// Middleware to log requests
const authRoutes = require('./routes/authRoutes');
// This code imports the authRoutes module, which contains the routes for user authentication
// It uses the express.Router() method to create a new router object
app.use('/api/auth', authRoutes);
const PORT = 3000;
// This code starts the server and listens on the specified port
// It uses the app.listen() method to bind the server to the port and start listening for incoming requests
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)  // Fixed template string
);
