/**
 * @file catwayService.js
 * @description Service layer for handling Catway operations (CRUD)
 */

const Catway = require('../models/Catway'); 


/**
 * Create a new catway
 * @param {number} catwayNumber - Unique catway number
 * @param {string} type - Catway type ('short' or 'long')
 * @param {string} catwayState - Catway state (e.g., 'bon état')
 * @returns {Promise<Object>} Created catway object
 */
exports.createCatway = async (catwayNumber, type, catwayState) => {
    return await Catway.create({ catwayNumber, type, catwayState });
    };

/**
 * Get all catways
 * @returns {Promise<Array>} Array of catways
 */
exports.getAllCatways = () => {
    return Catway.find().lean();     // Use lean() for better performance when no Mongoose document methods are needed
};

/**
 * Get a catway by ID
 * @param {string} id - Catway ID
 * @returns {Promise<Object|null>} Catway object or null if not found
 */
exports.getCatwayById = async (id) => {
    return await Catway.findById(id).lean();
};

/**
 * Update a catway by ID (supports PUT and PATCH)
 * @param {string} id - Catway ID
 * @param {Object} data - Data to update (partial or full)
 * @returns {Promise<Object|null>} Updated catway object or null if not found
 */
exports.updateCatway = async (id, data) => {
    const catway = await Catway.findById(id); // Use findById to get a Mongoose document
    if (!catway) return null;                 // Return null if catway not found
    // Update only the fields provided in catwayData
    Object.assign(catway, data);
    return await catway.save(); 
}

/**
 * Delete a catway by ID
 * @param {string} id - Catway ID
 * @returns {Promise<Object|null>} Deleted catway object or null if not found
 */
exports.deleteCatway = async (id) => {
    return await Catway.findByIdAndDelete(id);
};

