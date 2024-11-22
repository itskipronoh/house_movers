const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  modelYear: {
    type: Number,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  registerNumberPlate: {
    type: String,
    required: true,
  },
  loadingCapacity: {
    type: Number,
    required: true,
  },
  categoryType: {
    type: String,
    required: true,
  },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
