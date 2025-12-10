const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// GET all users
router.get('/', userController.getAllUsers);

// GET user by ID
router.get('/:id', userController.getUserById);

// Create a new user
router.post('/', userController.createUser);

// Update user by ID
router.put('/:id', userController.updateUser);  

// Render user update form
router.patch('/:id', userController.patchUserForm);

// Delete user by ID
router.delete('/:id', userController.deleteUser);


module.exports = router;