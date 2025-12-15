/**
 * @file reservationRoutes.js
 * @description Routes for reservations related to catways
 */

const express = require('express');
const router = express.Router();

const controller = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const validateObjectId = require('../middlewares/validateObjectId');

/**
 * @route   GET /api/catways/:catwayId/reservations
 * @desc    Get all reservations for a catway
 * @access  Authenticated users
 */
router.get(
    '/catways/:catwayId/reservations',
    authMiddleware,
    validateObjectId('catwayId'),
    controller.getReservationsByCatway
);

/**
 * @route   GET /api/catways/:catwayId/reservations/:reservationId
 * @desc    Get one reservation for a catway
 * @access  Authenticated users
 */
router.get(
    '/catways/:catwayId/reservations/:reservationId',
    authMiddleware,
    validateObjectId('catwayId'),
    validateObjectId('reservationId'),
    controller.getReservationByIdForCatway
);

/**
 * @route   POST /api/catways/:catwayId/reservations
 * @desc    Create a reservation for a catway
 * @access  Private 
 */
router.post(
    '/catways/:catwayId/reservations',
    authMiddleware,
    controller.createReservationForCatway
);

/**
 * @route   DELETE /api/catways/:catwayId/reservations/:reservationId
 * @desc    Delete a reservation for a catway
 * @access  Admin only 
 */
router.delete(
    '/catways/:catwayId/reservations/:reservationId',
    authMiddleware,
    adminMiddleware,
    validateObjectId('catwayI'),
    validateObjectId('reservationId'),
    controller.deleteReservationForCatway
);

module.exports = router;
