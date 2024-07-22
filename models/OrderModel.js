const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
        },
    ],
    pickupLocationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PickupLocation',
        required: true,
    },
    destinationLocationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DestinationLocation',
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
