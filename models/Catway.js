const mongoose = require('mongoose');
const validator = require('validator');
const { validate } = require('./User');

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
        enum: {
            values: ['available', 'reserved', 'maintenance'],
            message: '{VALUE} is not a valid catway state',
        },
    },
}, 
    { timestamps: true }
);


module.exports = mongoose.model('Catway', catwaySchema);
