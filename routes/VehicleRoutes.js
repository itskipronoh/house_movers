const express = require('express');
const {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
} = require('../controllers/VehicleController');

const router = express.Router();

router.post('/create', createVehicle);
router.get('/', getVehicles);
router.get('/:id', getVehicleById);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

module.exports = router;
