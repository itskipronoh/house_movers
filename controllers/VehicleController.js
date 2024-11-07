const Vehicle = require('../models/VehicleModel');

// Create a new vehicle
const createVehicle = async (req, res) => {
    console.log(req.body);
    try {
        const { name, modelYear, manufacturer, registerNumberPlate, loadingCapacity, categoryType } = req.body;
        const newVehicle = await Vehicle.create({ name, modelYear, manufacturer, registerNumberPlate, loadingCapacity, categoryType });
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all vehicles
const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single vehicle by ID
const getVehicleById = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a vehicle by ID
const updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedVehicle = await Vehicle.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a vehicle by ID
const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVehicle = await Vehicle.findByIdAndDelete(id);
        if (!deletedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(deletedVehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
};
