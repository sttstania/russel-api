/**
 * @file validateObjectId.js
 * @description Validate MongoDB ObjectId in request params
 */

// middlewares/validateObjectId.js
const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    const keys = Object.keys(req.params);

    for (const key of keys) {
        if (!mongoose.Types.ObjectId.isValid(req.params[key])) {
            return res.status(400).json({
                message: `Invalid MongoDB ID for parameter: ${key}`
            });
        }
    }

    next();
};

module.exports = validateObjectId;
