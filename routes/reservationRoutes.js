/**
 * @file reservationRoutes.js
 * @description Routes for reservations related to catways
 */

const express = require('express');
const router = express.Router();

const controller = require('../controllers/reservationController');
const validateObjectId = require('../middlewares/validateObjectId');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @route   GET /api/catways/:catwayId/reservations
 * @desc    Get all reservations for a specific catway
 * @access  Public
 */
router.get(
    '/catways/:catwayId/reservations',
    validateObjectId,
    controller.getReservationsByCatway
);

/**
 * @route   GET /api/catways/:catwayId/reservations/:reservationId
 * @desc    Get a specific reservation for a catway
 * @access  Public
 */
router.get(
    '/catways/:catwayId/reservations/:reservationId',
    validateObjectId,
    controller.getReservationByIdForCatway
);

/**
 * @route   POST /api/catways/:catwayId/reservations
 * @desc    Create a reservation for a catway
 * @access  Private (JWT required)
 */
router.post(
    '/catways/:catwayId/reservations',
    authMiddleware,
    validateObjectId,
    controller.createReservationForCatway
);

/**
 * @route   DELETE /api/catways/:catwayId/reservations/:reservationId
 * @desc    Delete a reservation for a catway
 * @access  Private (JWT required)
 */
router.delete(
    '/catways/:catwayId/reservations/:reservationId',
    authMiddleware,
    validateObjectId,
    controller.deleteReservationForCatway
);

module.exports = router;
