const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    topic: 'vehicle.test-bus-1',
    natServer: process.env.NATS_SERVER || 'nats://localhost:4222',
    dbUrl: process.env.DB_URL || 'mongodb+srv://nodejs-assignment:dwLuHGl8GNqAMiYW@cluster0.co4ugon.mongodb.net/?retryWrites=true&w=majority',
    dbName: 'vehiclesDb'
};
