const express = require('express');
const { findVehicles } = require('../controller/vehicle.controller');

const vehicleRouter = express.Router();

vehicleRouter.get('/', async (req, res) => {
    const vehicles = await findVehicles(req);
    return res.status(200).json(vehicles);
});

vehicleRouter.get('/:vehicleName', async (req, res) => {
    const resp = await findVehicles(req);
    if (resp.vehicles.length === 0) return res.status(404).json({ message: 'Vehicle name does not exist.' });
    return res.status(200).json(resp);
});

module.exports = vehicleRouter;
