const { MongoClient } = require('mongodb');
const config = require('./config/config');

const { dbUrl, dbName } = config;

let db;

async function connect() {
    if (!db) {
        db = await MongoClient.connect(dbUrl);
    }
    return db.db(dbName);
}

module.exports = {
    connect
};
