/**
 * @file catwayRoutes.js
 * @description Routes for Catway API endpoints
 */

const express = require('express');
const router = express.Router();

const catwayController = require('../controllers/catwayController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const validateObjectId = require('../middlewares/validateObjectId');

/**
 * @route GET /api/catways
 * @access Public
 */
router.get('/', catwayController.getAllCatways);

/**
 * @route GET /api/catways/:id
 * @access Public
 */
router.get(
    '/:id',
    validateObjectId, 
    catwayController.getCatwayById
);

/**
 * @route POST /api/catways
 * @access Protected
 */
router.post(
    '/', 
    authMiddleware,
    adminMiddleware, 
    catwayController.createCatway
);

/**
 * @route PUT /api/catways/:id
 * @access Protected
 */
router.put(
    '/:id', 
    authMiddleware,
    adminMiddleware, 
    validateObjectId,
    catwayController.updateCatway
);

/**
 * @route PATCH /api/catways/:id
 * @access Protected
 */
router.patch(
    '/:id', 
    authMiddleware, 
    adminMiddleware,
    validateObjectId
    catwayController.patchCatway
);

/**
 * @route DELETE /api/catways/:id
 * @access Protected
 */
router.delete(
    '/:id', 
    authMiddleware, 
    adminMiddleware,
    validateObjectId
    catwayController.deleteCatway
);

module.exports = router;
