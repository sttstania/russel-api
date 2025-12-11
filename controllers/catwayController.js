const catwayService = require('../services/catwayService');

// GET all catways
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await catwayService.getAllCatways();
        res.status(200).json(catways);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET by ID
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

// Create a new Catway
exports.createCatway = async (req, res) => {
    try {
        const { catwayNumber, type, catwayState } = req.body;
        const catway = await catwayService.createCatway(catwayNumber, type, catwayState);
        res.status(201).json(catway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update catway by ID (PUT)
exports.updateCatway = async (req, res) => {
    try {
        const catway = await catwayService.updateCatway(req.params.id, req.body);
        if (!catway) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        res.status(200).json(catway);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// Render catway update form
exports.patchCatwayForm = async (req, res) => {
    try {
        const catway = await catwayService.getCatwayById(req.params.id);
        if (!catway) return res.status(404).send('Catway not found');
        res.render('catwayEdit', { catway });
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
};

// PATCH catway by ID (update partiel)
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

// Delete catway by ID
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
