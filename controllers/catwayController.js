/**
 * @file catwayController.js
 * @description Controller layer for Catway API endpoints
 */

const catwayService = require('../services/catwayService');

/**
 * @route GET /api/catways
 * @description Retrieve all catways
 * @returns {Array<Object>} 200 - Array of catway objects
 * @returns {Object} 500 - Internal server error
 */
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await catwayService.getAllCatways();
        res.status(200).json(catways);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @route GET /api/catways/:id
 * @description Retrieve a single catway by ID
 * @param {string} req.params.id - MongoDB ObjectId of the catway
 * @returns {Object} 200 - Catway object
 * @returns {Object} 404 - Catway not found
 * @returns {Object} 500 - Internal server error
 */
exports.getCatwayById = async (req, res) => {
    try {
        const catway = await catwayService.getCatwayById(req.params.id);
        if (!catway) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        res.status(200).json(catway);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @route POST /api/catways
 * @description Create a new catway
 * @param {number} req.body.catwayNumber - Catway number
 * @param {string} req.body.type - Catway type ("short" or "long")
 * @param {string} req.body.catwayState - Catway state
 * @returns {Object} 201 - Created catway object
 * @returns {Object} 400 - Validation or bad request error
 */
exports.createCatway = async (req, res) => {
    try {
        const { catwayNumber, type, catwayState } = req.body;
        const catway = await catwayService.createCatway(catwayNumber, type, catwayState);
        res.status(201).json(catway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @route PUT /api/catways/:id
 * @description Replace entire catway by ID
 * @param {string} req.params.id - MongoDB ObjectId of the catway
 * @param {Object} req.body - Updated catway data (full replacement)
 * @returns {Object} 200 - Updated catway object
 * @returns {Object} 404 - Catway not found
 * @returns {Object} 500 - Internal server error
 */
exports.updateCatway = async (req, res) => {
    try {
        const { _id, ...updateData } = req.body; // ignore _id s'il est envoyé
        const catway = await catwayService.updateCatway(req.params.id, updateData, { new: true, runValidators: true });
        if (!catway) return res.status(404).json({ message: 'Catway not found' });
        res.status(200).json(catway);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

/**
 * @route PATCH /api/catways/:id
 * @description Partially update catway by ID
 * @param {string} req.params.id - MongoDB ObjectId of the catway
 * @param {Object} req.body - Fields to update
 * @returns {Object} 200 - Updated catway object
 * @returns {Object} 400 - No data to update
 * @returns {Object} 404 - Catway not found
 * @returns {Object} 500 - Internal server error
 */
exports.patchCatway = async (req, res) => {
  try {
    const catwayData = req.body;
    if (!catwayData || Object.keys(catwayData).length === 0) {
      return res.status(400).json({ message: 'Aucune donnée à modifier' });
    }
    const catway = await catwayService.updateCatway(req.params.id, catwayData);
    if (!catway) return res.status(404).json({ message: 'Catway not found' });
    res.status(200).json(catway);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

/**
 * @route DELETE /api/catways/:id
 * @description Delete catway by ID
 * @param {string} req.params.id - MongoDB ObjectId of the catway
 * @returns 204 - No Content / delete successful
 * @returns {Object} 404 - Catway not found
 * @returns {Object} 500 - Internal server error
 */
exports.deleteCatway = async (req, res) => {
    try {
        const catway = await catwayService.deleteCatway(req.params.id);
        if (!catway) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        res.status(204).send(); // No Content / delete successful
    } catch (error) {
        console.error('Error deleting catway:', error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
