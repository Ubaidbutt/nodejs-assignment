const { WebSocket } = require('ws');

function createWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });
    wss.on("connection", function (webSocket) {
        webSocket.send('You are connected with the web socket server');
    });
    return wss;
}

module.exports = createWebSocketServer;
