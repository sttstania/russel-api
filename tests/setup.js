/**
 * @file setup.js
 * @description Sets up and tears down an in-memory MongoDB server for testing
 * @module testSetup
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

/**
 * Hook executed once before all tests.
 * - Starts the in-memory MongoDB server
 * - Connects Mongoose to the in-memory database
*/
before(async function() {
    this.timeout(10000); // Increase timeout for starting MongoMemoryServer

    mongoServer = await MongoMemoryServer.create();  // Start in-memory MongoDB server
    const uri = mongoServer.getUri();  // Get connection URI


    // Prevent app.js from connecting to the real database
    process.env.MONGO_URI = uri;  // Set environment variable for DB connection

    // Connect mongoose to the in-memory database for tests
    await mongoose.connect(uri);
});

/**
 * Hook executed before each test.
 * - Clears all collections to ensure isolated test runs
*/
beforeEach(async function() {
    // Clear all collections before each test
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

/**
 * Hook executed once after all tests.
 * - Disconnects Mongoose
 * - Stops the in-memory MongoDB server
*/
after(async function() {
    await mongoose.disconnect();
    await mongoServer.stop();  // Stop the in-memory MongoDB server
});
