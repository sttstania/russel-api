const User = require('../models/User');
const bcrypt = require('bcrypt');


// Create a new user
exports.createUser = async (name, email, password) => {
    const hash = await bcrypt.hash(password, 10);
    
    const user = await User.create({ name, email, passwordHash: hash});
    return user; //already saved (created())
    };

// Get all users
exports.getAllUsers = () => {
    return User.find();
};

// Get user by ID
exports.getUserById = async (id) => {
    return await User.findById(id);
};

// Update user by ID
exports.updateUser = async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
}

// Delete user by ID
exports.deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

