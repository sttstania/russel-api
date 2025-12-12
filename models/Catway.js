/**
 * @file Catway.js
 * @description Mongoose schema and model for catways in Port Russell API
 */

const mongoose = require('mongoose');
const validator = require('validator');
const { validate } = require('./User');

/**
 * @typedef Catway
 * @property {number} catwayNumber - Unique identifier for the catway (integer >= 1)
 * @property {string} type - Type of catway ("short" or "long")
 * @property {string} catwayState - Current state of the catway (e.g., "bon état", "maintenance")
 * @property {Date} createdAt - Timestamp of creation
 * @property {Date} updatedAt - Timestamp of last update
 */
const catwaySchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: [true, 'Catway number is required'],
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: 'Catway number must be an integer'
        },
        min: [1, 'Catway number must be at least 1']
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        enum: {
            values: ['short', 'long'],
            message: '{VALUE} is not a valid type',
        },
    },
    catwayState: {
        type: String,
        required: [true, 'Catway state is required'],  
    },
}, 
    { timestamps: true }
);

/**
 * @type {mongoose.Model<Catway>}
 */

module.exports = mongoose.model('Catway', catwaySchema);