const NATS = require('nats');
const { addVehicle } = require('../repository/vehicles');
const { connect } = require('../utilities/database');
const config = require('./config/config');

const { topic, natServer } = config;
const vehicleName = topic.split('.')[1];

(async function () {
    try {
        await connect();
        const nats = NATS.connect({ json: true, servers: [natServer] });
        nats.on('error', (err) => {
            console.error(`Connection with NATS server failed. ${err}`);
            process.exit();
        });
        nats.on('connect', () => console.log('Receiver is connected with the NATS server'));
        nats.subscribe(topic, async (data) => {
            try {
                const res = await addVehicle({ ...data, vehicleName });
                console.log('Record added in the database: ', res.insertedId.toString());
            } catch (err) {
                console.error('Error while inserting vehicle data in the database. ', err);
            }
        });
    } catch (err) {
        console.log(`Error occured: ${err}`);
    }
})();
