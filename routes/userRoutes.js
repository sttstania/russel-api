/**
 * @file userRoutes.js
 * @description Routes for User API endpoints
 */

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const validateObjectId = require('../middlewares/validateObjectId');


/**
 * @route GET /api/users
 * @desc Get all users
 * @access Admin only
 */

router.get(
    '/',
    authMiddleware,
    adminMiddleware, 
    userController.getAllUsers);

/**
 * @route GET /api/users/:id
 * @desc Get a user by ID
 * @access Authenticated user
 */
router.get(
    '/:id', 
    authMiddleware,
    validateObjectId,
    userController.getUserById
);

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
 * @desc Update user
 * @access Authenticated user
 * @body {string} name - Name
 * @body {string} email - Email
 * @body {string} password - Plain text password
 * @body {string} [role] - User role 
 */
router.put(
    '/:id', 
    authMiddleware,
    validateObjectId,
    userController.updateUser
);  

/**
 * @route PATCH /api/users/:id
 * @desc Render user edit form (partial update)
 * @access Authenticated user
 */
router.patch(
    '/:id', 
    authMiddleware,
    validateObjectId,
    userController.patchUserForm
);

/**
 * @route DELETE /api/users/:id
 * @desc Delete a user by ID
 * @access Admin only
 */
router.delete(
    '/:id', 
    authMiddleware,
    adminMiddleware,
    validateObjectId,
    userController.deleteUser
);


module.exports = router;