/**
 * @file catwayseed.js
 * @description Synchronizes catways from JSON file to MongoDB database
 * @module catwayseed
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Catway = require('../models/Catway');

/**
 * Synchronize catways from JSON file to database.
 * - If a catway does not exist, it is created.
 * - If it exists, type and catwayState are updated if changed.
 * @async
 * @function syncCatways
 */
const syncCatways = async () => {
    try {
        await connectDB();

         /** @type {string} Path to the JSON file containing catways */
        const filePath = path.join(__dirname, '../data/catways.json');

        /** @type {string} Raw JSON data from file */
        const data = fs.readFileSync(filePath, 'utf-8');

        /** @type {Array<Object>} Parsed catways from JSON */
        const catwaysFromFile = JSON.parse(data);

        // Iterate through each catway from the file
        for (const catway of catwaysFromFile) {
            /** @type {Object|null} Existing catway in DB */
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

// Run the synchronization
syncCatways();