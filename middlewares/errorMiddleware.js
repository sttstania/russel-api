/**
 * @file errorMiddleware.js
 * @description Global error handling middleware
 */

const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid ID format'
        });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: err.message
        });
    }

    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;
