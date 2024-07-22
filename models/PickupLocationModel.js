const mongoose = require('mongoose');

const pickupLocationSchema = new mongoose.Schema({
    locationType: {
        type: String,
        required: true,
    },
    otherCategory: {
        type: String,
        default: '',
    },
    pickupLocation: {
        type: String,
        required: true,
    },
});

const PickupLocation = mongoose.model('PickupLocation', pickupLocationSchema);

module.exports = PickupLocation;
