const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    dbUrl: process.env.DB_URL || 'mongodb+srv://nodejs-assignment:dwLuHGl8GNqAMiYW@cluster0.co4ugon.mongodb.net/?retryWrites=true&w=majority',
    dbName: 'vehiclesDb',
    port: process.env.PORT || 4000
};
