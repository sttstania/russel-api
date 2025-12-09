const userService = require('../services/userService');

// GET all users
exports.getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    try {
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET by ID
exports.getUserById = async (req, res) => {
    const users = await userService.getUserById(req.params.id);
    try {
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        };
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update user by ID
exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.render('userEdit', { user });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// Render user creation form
exports.renderUserForm = (req, res) => {
};

// Render user update form
exports.patchUserForm = (req, res) => {
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
};