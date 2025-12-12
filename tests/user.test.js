/**
 * @file user.test.js
 * @description Integration tests for User API endpoints
 * @requires supertest
 * @requires chai
 * @requires ../app
 * @requires ../models/User
*/

const request = require('supertest');
const { expect } = require('chai');
const app = require('../app'); 
const User = require('../models/User');

/**
 * Integration tests for User API
*/
describe('User API - Tests', function() {

    /**
     * Test creating a new user
     * @route POST /api/users
     * @expectedStatus 201
    */
    it ('POST /api/users - should create a new user', async function() {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: 'John Doe',
                email: 'john@test.com',
                password: 'password123'  // Plain password; hashing is handled in the model
            });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('_id');
        expect(res.body.name).to.equal('John Doe');
        expect(res.body.email).to.equal('john@test.com');
    });

    /**
     * Test retrieving all users
     * @route GET /api/users
     * @expectedStatus 200
    */
    it ('GET /api/users - should return all users', async function() {
        // First, create a user to ensure the DB is not empty
        await User.create({ 
            name: 'Jane Doe', 
            email: 'jane@test.com', 
            passwordHash: 'fakehash123'   // Directly setting hash for test purposes
        });

        const res = await request(app).get('/api/users');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
        expect(res.body[0].name).to.equal('Jane Doe');
    });

    /**
     * Test retrieving a single user by ID
     * @route GET /api/users/:id
     * @expectedStatus 200
    */
    it ('GET /api/users/:id - should return user by ID', async function() {
        const newUser = await User.create({
            name: 'Bob',
            email: 'bob@test.com',
            passwordHash: 'hash987654'
        });

        const res = await request(app).get(`/api/users/${newUser._id}`);

        expect(res.status).to.equal(200);
        expect(res.body._id).to.equal(newUser._id.toString());
        expect(res.body.name).to.equal('Bob');
    });

    /**
     * Test deleting a user by ID
     * @route DELETE /api/users/:id
     * @expectedStatus 204
    */
    it ('DELETE /api/users/:id - should delete user by ID', async function() {
        const userToDelete = await User.create({
            name: 'Tom',
            email: 'tom@test.com',
            passwordHash: 'hash123456'
        });

        const res = await request(app).delete(`/api/users/${userToDelete._id}`);

        expect(res.status).to.equal(204);

        const deletedUser = await User.findById(userToDelete._id);  // Verify user is deleted
        expect(deletedUser).to.be.null;                             // User should no longer exist
    });

});
