/**
 * @file catwayRoutes.js
 * @description Routes for Catway API endpoints
 */

const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');


/**
 * @route GET /api/catways
 * @desc Get all catways
 * @access Public
 */
router.get('/', catwayController.getAllCatways);

/**
 * @route GET /api/catways/:id
 * @desc Get a catway by ID
 * @access Public
 */
router.get('/:id', catwayController.getCatwayById);

/**
 * @route POST /api/catways
 * @desc Create a new catway
 * @access Public
 * @body {number} catwayNumber - The number of the catway
 * @body {string} type - Type of catway ("short" or "long")
 * @body {string} catwayState - State description of the catway
 */
router.post('/', catwayController.createCatway);

/**
 * @route PUT /api/catways/:id
 * @desc Replace entire catway document
 * @access Public
 * @body {number} catwayNumber - The number of the catway
 * @body {string} type - Type of catway ("short" or "long")
 * @body {string} catwayState - State description of the catway
 */
router.put('/:id', catwayController.updateCatway);

/**
 * @route PATCH /api/catways/:id
 * @desc Update part of a catway document
 * @access Public
 * @body {Object} Any fields to update (catwayNumber, type, catwayState)
 */
router.patch('/:id', catwayController.patchCatway);

/**
 * @route DELETE /api/catways/:id
 * @desc Delete a catway by ID
 * @access Public
 */
router.delete('/:id', catwayController.deleteCatway);

module.exports = router;