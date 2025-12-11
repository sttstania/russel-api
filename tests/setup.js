const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

// Setup and teardown hooks for tests
before(async function() {
    this.timeout(10000); // Increase timeout for starting MongoMemoryServer

    mongoServer = await MongoMemoryServer.create();  // Start in-memory MongoDB server
    const uri = mongoServer.getUri();  // Get connection URI


    // Prevent app.js from connecting to the real database
    process.env.MONGO_URI = uri;  // Set environment variable for DB connection

    // Connect mongoose to the in-memory database for tests
    await mongoose.connect(uri);
});

// Clear database before each test
beforeEach(async function() {
    // Clear all collections before each test
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

// Teardown after all tests are done
after(async function() {
    await mongoose.disconnect();
    await mongoServer.stop();  // Stop the in-memory MongoDB server
});
