/**
 * @file userController.js
 * @description Controller layer for User API endpoints
 */

const userService = require('../services/userService');


/**
 * @route GET /api/users
 * @description Retrieve all users
 * @returns {Array<Object>} 200 - Array of user objects
 * @returns {Object} 500 - Internal server error
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @route GET /api/users/:id
 * @description Retrieve a single user by ID
 * @param {string} req.params.id - MongoDB ObjectId of the user
 * @returns {Object} 200 - User object
 * @returns {Object} 404 - User not found
 * @returns {Object} 500 - Internal server error
 */
exports.getUserById = async (req, res) => {
    try {
        const users = await userService.getUserById(req.params.id);
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        };
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @route POST /api/users
 * @description Create a new user
 * @param {string} req.body.name - User's name
 * @param {string} req.body.email - User's email
 * @param {string} req.body.password - User's plain password
 * @returns {Object} 201 - Created user object
 * @returns {Object} 400 - Validation or bad request error
 */
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userService.createUser(name, email,  password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @route PUT /api/users/:id
 * @description Replace or update a user by ID
 * @param {string} req.params.id - MongoDB ObjectId of the user
 * @param {Object} req.body - Updated user data
 * @returns {Object} 200 - Updated user object
 * @returns {Object} 404 - User not found
 * @returns {Object} 500 - Internal server error
 */
exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message:"Erreur serveur: ", error: error.message });
    }
};

/**
 * @route GET /userForm
 * @description Render form for creating a new user (EJS template)
 */
exports.renderUserForm = (req, res) => {
    res.render('userForm', { user: {} });
};

/**
 * @route PATCH /api/users/:id
 * @description Render user update form (partial update) using EJS template
 * @param {string} req.params.id - MongoDB ObjectId of the user
 */
exports.patchUserForm = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.render('userEdit', { user });
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
};

/**
 * @route DELETE /api/users/:id
 * @description Delete a user by ID
 * @param {string} req.params.id - MongoDB ObjectId of the user
 * @returns 204 - No Content, deletion successful
 * @returns 404 - User not found
 * @returns 500 - Internal server error
 */
exports.deleteUser = async (req, res) => {
    try {
        console.log('Delete user with ID:', req.params.id);
        const user = await userService.deleteUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send(); // No Content/ Delete successful
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message:"Erreur serveur: ", error: error.message });
    }
};