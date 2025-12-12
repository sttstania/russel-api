/**
 * @file User.js
 * @description Mongoose schema and model for users in Port Russell API
 */

const mongoose = require('mongoose');

const validator = require('validator');

/**
 * @typedef User
 * @property {string} name - Name of the user (letters and spaces only, min 2 characters)
 * @property {string} email - User's email (must be unique and valid)
 * @property {string} passwordHash - Hashed password (min 8 characters)
 * @property {string} [role='user'] - Role of the user ("user" or "admin")
 * @property {Date} createdAt - Timestamp of creation
 * @property {Date} updatedAt - Timestamp of last update
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name must be at least 2 characters long'],
        trim: true,
        match: [/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email address'
        },
        lowercase: true,
        trim: true
    },
    passwordHash:{
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters long']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
}, { timestamps: true });  // Automatically manage createdAt and updatedAt fields

// Unique index on email
userSchema.index({ email: 1 }, { unique: true });


/**
 * @type {mongoose.Model<User>}
*/

module.exports = mongoose.model('User', userSchema);