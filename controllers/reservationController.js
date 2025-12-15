const Catway = require('../models/Catway');
const Reservation = require('../models/Reservation');
const User = require('../models/User');

/**
 * Get all reservations for a specific catway
 */
exports.getReservationsByCatway = async (req, res) => {
    try {
        const { catwayId } = req.params;

        const reservations = await Reservation.find({ catway: catwayId })
            .populate('client', 'name email');

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Get one reservation for a specific catway
 */
exports.getReservationByIdForCatway = async (req, res) => {
    try {
        const { catwayId, reservationId } = req.params;

        const reservation = await Reservation.findOne({
            _id: reservationId,
            catway: catwayId
        }).populate('client', 'name email');

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Create reservation for a catway
 */
exports.createReservationForCatway = async (req, res) => {
    try {
        const { catwayId } = req.params;
        const { clientName, boatName, checkIn, checkOut } = req.body;

        const catway = await Catway.findById(catwayId);
        if (!catway) {
            return res.status(404).json({ message: 'Catway not found' });
        }

        const user = await User.findOne({ name: clientName });
        if (!user) {
            return res.status(404).json({ message: `User ${clientName} not found` });
        }

        const reservation = await Reservation.create({
            catway: catway._id,
            catwayNumber: catway.catwayNumber,
            client: user._id,
            boatName,
            checkIn,
            checkOut,
            status: 'reserved'
        });

        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Delete reservation for a catway
 */
exports.deleteReservationForCatway = async (req, res) => {
    try {
        const { catwayId, reservationId } = req.params;

        const reservation = await Reservation.findOneAndDelete({
            _id: reservationId,
            catway: catwayId
        });

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
