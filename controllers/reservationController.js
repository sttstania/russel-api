/**
 * @description Get all reservations for a specific catway
*/

const { checkout } = require("../app");
const Catway = require("../models/Catway");
const Reservation = require("../models/Reservation");

/**
 * @description Get all reservations for a specific catway
*/
exports.getReservationsByCatway = async (req, res) => {
    try  {
        const catway = await Catway.findById(req.params.id);
        if (!catway) return res.status(404).jon({message: 'Catway not find'});

        const reservations = await Reservation.find({ Catway: catway.id })
            .populate('client', 'name email');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @description Get a specific reservation by its id for a catway
*/
exports.getReservationByIdForCatway = async (req, res) => {
    try {
        const reservation = await Reservation.findOne({
            _id: req.params.idReservation,
            catway: req.params.id
        }).populate('client', 'name email');

        if (!reservation) return res.status(404).json({ message: 'Reservation not found'});
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @description Create a reservation for a specific catway
*/
exports.createReservationForCatway = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if(!catway) return res.status(404).json({ message: 'Catway not found' });

        const { clientName, boatName, checkIn, checkOut, status } = req.body;

        const client = await User.findOne({ name: ClientName });
        if (!client) return res.status(404).json({ message: `User ${clientName} not found`});

        const reservation = await Reservation.create({
            catway: catway._id,
            catwayNumber: catway.catwayNumber,
            client: client._id,
            boatName,
            checkIn: new Date(checkIn),
            checkout: new Date(checkOut),
            status: status || 'reserved'
        });

        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: 'Error creating reservation', error: error.message });
    }
};

