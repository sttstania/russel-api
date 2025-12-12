/**
 * @file catway.test.js
 * @description Unit & integration tests for Catway API endpoints
*/

const request = require('supertest');
const { expect } = require('chai');
const app = require('../app'); 
const Catway = require('../models/Catway');

/**
 * Test suite for Catway API
*/
describe('Catway API - Tests', function() {
    /**
     * Clear the database before each test to ensure isolated tests
    */
    beforeEach(async function() {
        await Catway.deleteMany({});
    });

    /**
     * @test POST /api/catways
     * @description Should create a new catway
    */
    it('POST /api/catways - should create a new catway', async function() {
        const res = await request(app)
            .post('/api/catways')
            .send({
                catwayNumber: 1,
                type: 'short',
                catwayState: 'bon état'
            });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('_id');
        expect(res.body.catwayNumber).to.equal(1);
        expect(res.body.type).to.equal('short');
        expect(res.body.catwayState).to.equal('bon état');
    });

    /**
     * @test GET /api/catways
     * @description Should return all catways
    */
    it('GET /api/catways - should return all catways', async function() {
        await Catway.create({ catwayNumber: 2, type: 'long', catwayState: 'à réparer' });

        const res = await request(app).get('/api/catways');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array').with.lengthOf(1);
        expect(res.body[0].catwayNumber).to.equal(2);
    });

    /**
     * @test GET /api/catways/:id
     * @description Should return a catway by its ID
    */
    it('GET /api/catways/:id - should return catway by ID', async function() {
        const catway = await Catway.create({ catwayNumber: 3, type: 'short', catwayState: 'bon état' });
        const res = await request(app).get(`/api/catways/${catway._id}`);
        expect(res.status).to.equal(200);
        expect(res.body._id).to.equal(catway._id.toString());
    });

    /**
     * @test PUT /api/catways/:id
     * @description Should replace a catway completely
    */
    it('PUT /api/catways/:id - should replace a catway completely', async function() {
        const catway = await Catway.create({ catwayNumber: 4, type: 'short', catwayState: 'bon état' });

        const res = await request(app)
            .put(`/api/catways/${catway._id}`)
            .send({ catwayNumber: 4, type: 'long', catwayState: 'maintenance' });

        expect(res.status).to.equal(200);
        expect(res.body.type).to.equal('long');
        expect(res.body.catwayState).to.equal('maintenance');
    });

    /**
     * @test PATCH /api/catways/:id
     * @description Should update a catway partially
    */
    it('PATCH /api/catways/:id - should update a catway partially', async function() {
        const catway = await Catway.create({ catwayNumber: 5, type: 'short', catwayState: 'bon état' });

        const res = await request(app)
            .patch(`/api/catways/${catway._id}`)
            .send({ catwayState: 'maintenance' });

        expect(res.status).to.equal(200);
        expect(res.body.catwayState).to.equal('maintenance');
        expect(res.body.type).to.equal('short'); // unchanged
    });

    /**
     * @test DELETE /api/catways/:id
     * @description Should delete a catway
    */
    it('DELETE /api/catways/:id - should delete catway', async function() {
        const catway = await Catway.create({ catwayNumber: 6, type: 'long', catwayState: 'bon état' });

        const res = await request(app).delete(`/api/catways/${catway._id}`);
        expect(res.status).to.equal(204);

        const deleted = await Catway.findById(catway._id);
        expect(deleted).to.be.null;
    });
});
