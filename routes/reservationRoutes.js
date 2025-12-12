/**
 * @file reservationRoutes.js
 * @description Routes for reservations related to catways
 */

const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to get catway id
const reservationController = require('../controllers/reservationController');

/**
 * GET /catways/:id/reservations
 * Get all reservations for a specific catway
*/
router.get('/catways/:id/reservations', reservationController.getReservationByCatway);

/**
 * GET /catways/:id/reservations/:idReservation
 * Get one reservation belonging to a catway
*/
router.get('/catway/:id/reservations/:/idReservatio', reservationController.getReservationByIdForCatway);

/**
 * POST /catways/:id/reservations
 * Create a reservation for a specific catway
*/
router.post('/catway/:idreservations', reservationController.createReservationForCatway);


/**
 * DELETE /catways/:id/reservations/:idReservation
 * Delete a reservation from a catway
*/
router.delete('catway/:id/reservations/:idReservation', reservationController.deleteReservation);

module.exports = router