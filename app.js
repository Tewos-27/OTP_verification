const express = require('express');
const connctDB = require('./config/db');
const connectDB = require('./config/db');

// Connect to MongoDb

connectDB();

const app = express();
app.use(express.json()); // Middleware to parse JSON

const PORT = 3000;
app.listen(PORT, () => 
    console.log('Server running on port ${PORT}')
);
