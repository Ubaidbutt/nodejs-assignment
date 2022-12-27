const express = require('express');
const http = require('http');
const WebSocket = require('ws').WebSocket;

const { connect } = require('../utilities/database');
const config = require('./config/config');

const { port } = config;

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

server.listen(port, async () => {
    const db = await connect();
    const collectionStream = db.collection('vehicles').watch();
    wss.on('connection', (ws) => {
        collectionStream.on('change', (document) => {
            const { fullDocument, operationType } = document;
            if (operationType === 'insert') {
                ws.send(JSON.stringify(fullDocument));
            }
        });
        ws.send(`You have connected to the WebSocket Server!`);
    });
    // Log server is listening
    console.log(`Web socket server started on port ${port}`);
});
