/**
 * @file catwayRoutes.js
 * @description Routes for Catway API endpoints
 */

const express = require('express');
const router = express.Router();

const catwayController = require('../controllers/catwayController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @route GET /api/catways
 * @access Public
 */
router.get('/', catwayController.getAllCatways);

/**
 * @route GET /api/catways/:id
 * @access Public
 */
router.get('/:id', catwayController.getCatwayById);

/**
 * @route POST /api/catways
 * @access Protected
 */
router.post('/', authMiddleware, catwayController.createCatway);

/**
 * @route PUT /api/catways/:id
 * @access Protected
 */
router.put('/:id', authMiddleware, catwayController.updateCatway);

/**
 * @route PATCH /api/catways/:id
 * @access Protected
 */
router.patch('/:id', authMiddleware, catwayController.patchCatway);

/**
 * @route DELETE /api/catways/:id
 * @access Protected
 */
router.delete('/:id', authMiddleware, catwayController.deleteCatway);

module.exports = router;
