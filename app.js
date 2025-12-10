const express = require('express');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');

const app = express();
connectDB();


// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);


// Start the server
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);;
});


// home route
app.get('/', (req, res) => {
    res.send('Welcome to the Port Russell API');
});