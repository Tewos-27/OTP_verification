const express = require('express');
const connctDB = require('./config/db');
const connectDB = require('./config/db');

// Connect to MongoDb

connectDB();

const app = express();
app.use(express.json()); // Middleware to parse JSON

app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitilized: true,
    cookie: {secure: false}
}));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const PORT = 3000;
app.listen(PORT, () => 
    console.log('Server running on port ${PORT}')
);