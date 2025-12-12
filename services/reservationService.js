/**
 * @file reservationService.js
 * @description Service layer for Reservation operations
*/

const Reservation = require('../models/Reservation');

/**
 * Get all reservations
 * @returns {Promise<Array>}
*/
exports.getAllReservations = async () => {
    return await Reservation.find().populate('catway').exec();
};

/**
 * Get a reservation by ID
 * @param {string} id
 * @returns {Promise<Object|null>}
*/
exports.getReservationById = async (id) => {
    return await Reservation.findById(id).populate('catway').exec();
};

/**
 * Create a new reservation
 * @param {Object} data
 * @returns {Promise<Object>}
*/
exports.createReservation = async (data) => {
    return await Reservation.create(data);
};

/**
 * Update a reservation by ID (full or partial)
 * @param {string} id
 * @param {Object} data
 * @returns {Promise<Object|null>}
*/
exports.updateReservation = async (id, data) => {
    return await Reservation.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

/**
 * Delete a reservation by ID
 * @param {string} id
 * @returns {Promise<Object|null>}
*/
exports.deleteReservation = async (id) => {
    return await Reservation.findByIdAndDelete(id);
};