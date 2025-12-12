/**
 * @file app.js
 * @description Main Express application for Port Russell API
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');


const app = express();

/**
 * Connect to MongoDB
 * Only connect if not in test environment to avoid collisions with in-memory DB
 */
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

/**
 * Express middlewares
 * - JSON parsing
 */
app.use(express.json());

/**
 * Routes
 * @route /api/users
 * @route /api/catways
 */
app.use('/api/users', userRoutes);
app.use('/api/catways', require('./routes/catwayRoutes'));


/**
 * @route GET /
 * @description Basic welcome route
 * @returns {string} Welcome message
 */
app.get('/', (req, res) => {
    res.send('Welcome to the Port Russell API');
});

/**
 * Start server if not testing
 * The server is not started during testing to prevent port conflicts
 */
if (process.env.NODE_ENV != 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    
    })
}

/**
 * @exports app
 */
module.exports = app;
