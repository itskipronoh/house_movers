const mongoose = require('mongoose');

const destinationLocationSchema = new mongoose.Schema({
    locationType: {
        type: String,
        required: true,
    },
    otherCategory: {
        type: String,
        default: '',
    },
    dropOffLocation: {
        type: String,
        required: true,
    },
});

const DestinationLocation = mongoose.model('DestinationLocation', destinationLocationSchema);

module.exports = DestinationLocation;
