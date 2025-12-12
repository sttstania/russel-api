/**
 * @file reservationSeed.js
 * @description Seed reservations from JSON file into MongoDB
*/

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Reservation = require('../models/Reservation');
const Catway = require('../models/Catway');
const User = require('../models/User');  

/**
 * Seed reservations into MongoDB
*/
const syncReservations = async () => {
    try {
        await connectDB();

        const filePath = path.join(__dirname, '../data/reservations.json');
        const reservationsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        for (const item of reservationsData) {
            // Find the Catway document by catwayNumber
            const catway = await Catway.findOne({ catwayNumber: item.catwayNumber });
            if (!catway) {
                console.warn(`Catway ${item.catwayNumber} not found. Skipping reservation for ${item.clientName}.`);
                continue;
            }

            // Find the User document by name
            const user = await User.findOne({ name: item.clientName });
            if (!user) {
                console.warn(`User ${item.clientName} not found. Skipping reservation.`);
                continue;
            }

            // Avoid duplicates
            const existing = await Reservation.findOne({ catway: catway._id, client: user._id });
            if (existing) {
                console.log(`Reservation for ${item.clientName} on Catway ${item.catwayNumber} already exists. Skipping.`);
                continue;
            }

            // Create reservation
            await Reservation.create({
                catway: catway._id,
                catwayNumber: item.catwayNumber,
                client: user._id,  // reference to User
                boatName: item.boatName,
                checkIn: new Date(item.checkIn),
                checkOut: new Date(item.checkOut),
                status: 'reserved'
            });

            console.log(`Reservation for ${item.clientName} on Catway ${item.catwayNumber} added.`);
        }

        await mongoose.connection.close();
        console.log('Reservations seeding complete.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding reservations:', error);
        process.exit(1);
    }
};

// Execute seeding
syncReservations();
