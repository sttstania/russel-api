/**
 * @file userService.js
 * @description Service layer for handling User operations (CRUD)
 */

const User = require('../models/User');
const bcrypt = require('bcrypt');


/**
 * Create a new user
 * @param {string} name - User's name
 * @param {string} email - User's email
 * @param {string} password - Plain password
 * @returns {Promise<Object>} Created user
 */
exports.createUser = async (name, email, password) => {
    const hash = await bcrypt.hash(password, 10);
    
    const user = await User.create({ name, email, passwordHash: hash});
    return user; //already saved (created())
    };

/**
 * Get all users
 * @returns {Promise<Array>} Array of all users
 */
exports.getAllUsers = () => {
    return User.find();
};

/**
 * Get a user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object|null>} User object or null if not found
 */
exports.getUserById = async (id) => {
    return await User.findById(id);
};

/**
 * Update a user by ID
 * @param {string} id - User ID
 * @param {Object} userData - Fields to update
 * @returns {Promise<Object|null>} Updated user object or null if not found
 */
exports.updateUser = async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
}

/**
 * Delete a user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object|null>} Deleted user object or null if not found
 */
exports.deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

