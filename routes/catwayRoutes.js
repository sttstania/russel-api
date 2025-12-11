const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');


// GET all catways
router.get('/', catwayController.getAllCatways);

// GET catway by ID
router.get('/:id', catwayController.getCatwayById);

// Create a new catway
router.post('/', catwayController.createCatway);

// Update catway by ID (API)
router.put('/:id', catwayController.updateCatway);  

// Render catway update form
router.patch('/:id', catwayController.patchCatwayForm);

// Delete user by ID
router.delete('/:id', catwayController.deleteCatway);


module.exports = router;