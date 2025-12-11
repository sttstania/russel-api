require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');


const app = express();

// Connect to MongoDB
    connectDB();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/catways', require('./routes/catwayRoutes'));

app.get('/', (req, res) => {
    res.send('Welcome to the Port Russell API');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    // Auto-run tests when RUN_TESTS=true
     if (process.env.RUN_TESTS === 'true') {
        console.log('🔥 Running tests automatically...');
        exec('npm test', (error, stdout, stderr) => {
            console.log(stdout);
            if (stderr) console.error(stderr);
            if (error) console.error(error);

            // Close DB connection after tests
            const mongoose = require('mongoose');
            mongoose.connection.close();
        });
    }
});


module.exports = app;
