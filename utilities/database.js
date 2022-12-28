const { MongoClient } = require('mongodb');

let db;
async function connect({ dbUrl, dbName }) {
    if (!db) {
        db = await MongoClient.connect(dbUrl);
    }
    return db.db(dbName);
}

module.exports = {
    connect
};
