const http = require('http');
const createWebSocketServer = require('./createWebSocketServer');

const config = require('./config/config');
const { connect } = require('../utilities/database');

const { dbName, dbUrl } = config;

async function startServer(port) {
    try {
        const server = http.createServer();
        const wss = createWebSocketServer(server);
        const db = await connect({ dbUrl, dbName });
        const collectionStream = db.collection('vehicles').watch();
        collectionStream.on('change', (document) => {
            const { fullDocument, operationType } = document;
            if (operationType === 'insert') {
                wss.clients.forEach((ws) => ws.send(JSON.stringify(fullDocument)));
            }
        });
        return new Promise((resolve) => {
            server.listen(port, () => resolve(server));
        });
    } catch (err) {
        return new Promise.reject(err);
    }
}

module.exports = { startServer };
