const userService = require('../services/userService');


// GET all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET by ID
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

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userService.createUser(name, email,  password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update user by ID
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

// Render user creation form / USERFORMS FROM EJS
exports.renderUserForm = (req, res) => {
    res.render('userForm', { user: {} });
};

// Render user update form
exports.patchUserForm = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.render('userEdit', { user });
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
};


// Delete user by ID
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