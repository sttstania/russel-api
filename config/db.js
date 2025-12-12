/**
 * @file db.js
 * @description Connects to MongoDB using Mongoose
 * @module connectDB
 */

const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the URI from environment variable or default local URI
 * @async
 * @function
*/
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/russels-api';
        await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
        console.log(`MongoDB connected successfully to ${uri}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }   
};

module.exports = connectDB;