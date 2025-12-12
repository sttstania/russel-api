/**
 * @file userRoutes.js
 * @description Routes for User API endpoints
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


/**
 * @route GET /api/users
 * @desc Get all users
 * @access Public
 */

router.get('/', userController.getAllUsers);

/**
 * @route GET /api/users/:id
 * @desc Get a user by ID
 * @access Public
 */
router.get('/:id', userController.getUserById);

/**
 * @route POST /api/users
 * @desc Create a new user
 * @access Public
 * @body {string} name - Name of the user
 * @body {string} email - User email (must be unique)
 * @body {string} password - Plain text password (hashed in model/service)
 */
router.post('/', userController.createUser);

/**
 * @route PUT /api/users/:id
 * @desc Replace entire user document
 * @access Public
 * @body {string} name - Name
 * @body {string} email - Email
 * @body {string} password - Plain text password
 * @body {string} [role] - User role ("user" or "admin")
 */
router.put('/:id', userController.updateUser);  

/**
 * @route PATCH /api/users/:id
 * @desc Render user edit form (partial update)
 * @access Public
 */
router.patch('/:id', userController.patchUserForm);

/**
 * @route DELETE /api/users/:id
 * @desc Delete a user by ID
 * @access Public
 */
router.delete('/:id', userController.deleteUser);


module.exports = router;