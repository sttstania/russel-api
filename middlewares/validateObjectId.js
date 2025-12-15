/**
 * @file validateObjectId.js
 * @description Validate any MongoDB ObjectId in request params
 */

const mongoose = require('mongoose');

const validateObjectId = (paramName) => {
  return (req, res, next) => {
    const value = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(value)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId for parameter "${paramName}"`
      });
    }

    next();
  };
};

module.exports = validateObjectId;
