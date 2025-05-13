const mongoose = require('mongoose');
const User = require('../models/User'); // Import the user model

const MONGO_URL = "mongodb+srv://tewodrosshimels54:0Um2fZoyVxGTkuzT@cluster0.6qbzy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            // You can remove these deprecated options
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });

        console.log('MongoDb Connected Successfully!!');
        // Remove this line:
        // await User.createCollection();
        // console.log('User collection created successfully');

    } catch (err) {
        console.error('MongoDB Connection Failed:', err.message);
        process.exit(1); //Exit the process with failure

    }
};

connectDB();
module.exports = connectDB;