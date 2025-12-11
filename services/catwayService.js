const Catway = require('../models/Catway'); 


// Create a new catway
exports.createCatway = async (catwayNumber, type, catwayState) => {
    const catway = await Catway.create({ catwayNumber, type, catwayState});
    return catway; //already saved (created())
    };

// Get all catways
exports.getAllCatways = () => {
    return Catway.find();
};

// Get catway by ID
exports.getCatwayById = async (id) => {
    return await Catway.findById(id);
};

// Update catway by ID (PUT or PATCH)
exports.updateCatway = (id, catwayData) => {
    return Catway.findByIdAndUpdate(id, catwayData, { new: true, runValidators: true });
}

// Delete catway by ID
exports.deleteCatway = async (id) => {
    return await Catway.findByIdAndDelete(id);
};

