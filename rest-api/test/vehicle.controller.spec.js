const request = require('supertest');

const vehicles = require('./api/MongoDb/data/vehicles');
const app = require('../app');


describe('Vehicle data', () => {
    it('should return all 3 vehicles', async () => {
        const response = await request(app).get('/vehicles');
        expect(response.status).toBe(200);
        const { body } = response;
        expect(body.vehicles.length).toBe(3);
        expect(body.pagination).toMatchObject({
            limit: 10,
            offset: 0
        });
    });

    it('should return 3rd vehicle only', async () => {
        const response = await request(app).get('/vehicles?limit=1&offset=2');
        expect(response.status).toBe(200);
        const { body } = response;
        expect(body.vehicles.length).toBe(1);
        expect(body.vehicles[0]).toMatchObject(vehicles[2]);
        expect(body.pagination).toMatchObject({
            limit: 1,
            offset: 2
        });
    });
});
