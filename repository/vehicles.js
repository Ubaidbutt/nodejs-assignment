const { connect } = require('../utilities/database');
const config = require('./config/config');

const { dbName, dbUrl } = config;

async function addVehicle(data) {
    const db = await connect({ dbUrl, dbName });
    return db.collection('vehicles').insertOne(data);
}

async function getVehicle(options, filters = {}) {
    const db = await connect({ dbUrl, dbName });
    return db.collection('vehicles').find(filters).skip(options.offset).limit(options.limit).toArray();
}

module.exports = {
    addVehicle,
    getVehicle
};
