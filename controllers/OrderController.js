const Order = require('../models/OrderModel');
const Customer = require('../models/CustomerModel');
const Vehicle = require('../models/VehicleModel');
const Item = require('../models/ItemModel');
const PickupLocation = require('../models/PickupLocationModel');
const DestinationLocation = require('../models/DestinationLocationModel');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const {
            customerId,
            vehicleId,
            items,
            pickUpLocationType,
            pickUpOtherCategory,
            pickUpLocation,
            dropOffLocationType,
            dropOffOtherCategory,
            dropOffLocation,
            dateTime,
        } = req.body;

        // Check if customer exists
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Check if vehicle exists
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        // Create pickup location
        const newPickupLocation = new PickupLocation({
            locationType: pickUpLocationType,
            otherCategory: pickUpOtherCategory,
            pickupLocation: pickUpLocation,
        });
        await newPickupLocation.save();

        // Create destination location
        const newDestinationLocation = new DestinationLocation({
            locationType: dropOffLocationType,
            otherCategory: dropOffOtherCategory,
            dropOffLocation: dropOffLocation,
        });
        await newDestinationLocation.save();

        // Create a new order
        const newOrder = new Order({
            customerId,
            vehicleId,
            items,
            pickupLocationId: newPickupLocation._id,
            destinationLocationId: newDestinationLocation._id,
            dateTime,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customerId')
            .populate('vehicleId')
            .populate('items')
            .populate('pickupLocationId')
            .populate('destinationLocationId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id)
            .populate('customerId')
            .populate('vehicleId')
            .populate('items')
            .populate('pickupLocationId')
            .populate('destinationLocationId');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an order by ID
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            pickUpLocationType,
            pickUpOtherCategory,
            pickUpLocation,
            dropOffLocationType,
            dropOffOtherCategory,
            dropOffLocation,
            ...orderData
        } = req.body;

        // Find and update the order
        const updatedOrder = await Order.findByIdAndUpdate(id, orderData, { new: true })
            .populate('customerId')
            .populate('vehicleId')
            .populate('items')
            .populate('pickupLocationId')
            .populate('destinationLocationId');
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update the pickup location if provided
        if (pickUpLocationType || pickUpOtherCategory || pickUpLocation) {
            await PickupLocation.findByIdAndUpdate(updatedOrder.pickupLocationId, {
                locationType: pickUpLocationType,
                otherCategory: pickUpOtherCategory,
                pickupLocation: pickUpLocation,
            });
        }

        // Update the destination location if provided
        if (dropOffLocationType || dropOffOtherCategory || dropOffLocation) {
            await DestinationLocation.findByIdAndUpdate(updatedOrder.destinationLocationId, {
                locationType: dropOffLocationType,
                otherCategory: dropOffOtherCategory,
                dropOffLocation: dropOffLocation,
            });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await PickupLocation.findByIdAndDelete(deletedOrder.pickupLocationId);
        await DestinationLocation.findByIdAndDelete(deletedOrder.destinationLocationId);
        res.status(200).json(deletedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
