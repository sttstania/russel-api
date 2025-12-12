/**
 * @file Reservation.js
 * @description Mongoose model for reservations
 */

const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
 
    /** @type {mongoose.Schema.Types.ObjectId} Reference to Catway */
    catway: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catway',
        required: [true, 'Catway reference is required']
    },
 
    /** @type {Number} Catway number (redundant for easier queries) */
    catwayNumber: {
        type: Number,
        required: [true, 'Catway number is required']
    },
  
    /** @type {String} Name of the client making the reservation */
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required']
    },
  
    /** @type {String} Boat name */
    boatName: {
        type: String,
        required: [true, 'Boat name is required']
    },
 
    /** @type {Date} Check-in date */
    checkIn: {
        type: Date,
        required: [true, 'Check-in date is required']
    },
  
    /** @type {Date} Check-out date */
    checkOut: {
        type: Date,
        required: [true, 'Check-out date is required']
    },
  
    /** @type {String} Reservation status */
    status: {
        type: String,
        enum: ['available', 'reserved', 'cancelled'],
        default: 'reserved'
    }
},  {
    timestamps: true
});

// Index for faster population and queries
ReservationSchema.index({ catway: 1 });
ReservationSchema.index({ catwayNumber: 1 });

module.exports = mongoose.model('Reservation', ReservationSchema);
