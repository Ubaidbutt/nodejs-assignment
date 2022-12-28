const WebSocket = require('ws').WebSocket;
const { startServer } = require('../server');

const config = require('../config/config');
const { connect } = require('../../utilities/database');

const { dbName, dbUrl } = config;

describe('Web socket server', () => {
    let server, db;
    beforeAll(async () => {
        db = await connect({ dbName, dbUrl });
        server = await startServer(5000);
    });

    afterAll(() => server.close());

    it('should pass', async () => {
        const client = new WebSocket('ws://localhost:5000');
        const dummy = { test: 'abc' };
        await db.collection('vehicles').insertOne(dummy);
        client.on('message', data => {
            console.log('message: ', data);
            expect(data).toEql(dummy);
            client.close();
        });
    });
});
