require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Catway = require('../models/Catway');

// Function to sync catways from JSON file to database
const syncCatways = async () => {
    try {
        await connectDB();

        // Read catways from JSON file
        const filePath = path.join(__dirname, '../data/catways.json');
        const data = fs.readFileSync(filePath, 'utf-8');
        const catwaysFromFile = JSON.parse(data);

        // Iterate through each catway from the file
        for (const catway of catwaysFromFile) {
            const existingCatway = await Catway.findOne({ catwayNumber: catway.catwayNumber });

            // If catway doesn't exist, create it; if it exists, update it
            if (!existingCatway) {
                await Catway.create(catway);
                console.log(`Catway ${catway.catwayNumber} added.`);
            } else {
                let changed = false;
                ['type', 'catwayState'].forEach(field => {
                    if (existingCatway[field] !== catway[field]) {
                        existingCatway[field] = catway[field];
                        changed = true;
                    }
                });

                // Save only if there are changes
                if (changed) {
                    await existingCatway.save();
                    console.log(`Catway ${catway.catwayNumber} updated.`);
                }
            }
        }

        // Close the database connection
        await mongoose.connection.close();
        console.log('Catways synchronization complete.');
        process.exit(0);
    } catch (error) {
        console.error('Error during catways synchronization:', error);
        process.exit(1);
    }
};

syncCatways();