const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

const vehicles = require('./data/vehicles');

dotenv.config();

const connString = process.env.DB_URL;
const client = new MongoClient(connString);

async function main() {
    await client.connect();
    const db = client.db('vehiclesDb');
    const vehiclesCollection = db.collection('vehicles');
    await vehiclesCollection.insertMany(vehicles);
}


main()
    .catch(console.error)
    .finally(() => {
        console.log('Ran completed');
        client.close()
    });
