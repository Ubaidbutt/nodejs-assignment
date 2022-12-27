const { connect } = require('../utilities/database');

async function addVehicle(data) {
    const db = await connect();
    return db.collection('vehicles').insertOne(data);
}

async function getVehicle(options, filters = {}) {
    const db = await connect();
    return db.collection('vehicles').find(filters).skip(options.offset).limit(options.limit).toArray();
}

module.exports = {
    addVehicle,
    getVehicle
};
