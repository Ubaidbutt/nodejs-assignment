const { startServer } = require('./server');
const config = require('./config/config');

const { port } = config;

(async () => {
    await startServer(port);
    console.log(`Web socket server is up and running on port ${port}`);
})();

