const express = require('express');
const vehicleRouter = require('./router/vehicle.router');
const { connect } = require('../utilities/database');
const config = require('./config/config');

const { dbName, dbUrl } = config;

console.log('app: ', dbName, dbUrl);

const port = 4000;

const app = express();

app.use('/vehicles', vehicleRouter);

connect({ dbName, dbUrl })
    .then(() => {
        app.listen(port, () => console.log(`The server is up and running on port ${port}`));
    })
    .catch((err) => console.error(`Error occured while connecting with the database: ${err}`));

module.exports = app;
