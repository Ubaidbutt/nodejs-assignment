const { getVehicle } = require('../../repository/vehicles');

async function findVehicles(req) {
    const { limit, offset } = req.query;
    const vehicleName = req.params.vehicleName;
    const filter = vehicleName ? { vehicleName } : {};
    const pagination = {
        limit: parseInt(limit ?? 10),
        offset: parseInt(offset ?? 0)
    };
    const vehicles = await getVehicle(pagination, filter);
    return { vehicles, pagination };
}

module.exports = {
    findVehicles
}
