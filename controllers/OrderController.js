const Order = require('../models/OrderModel');
const CustomError = require('../errors');
const User = require('../models/user');
const asyncHandler = require('../middleware/asyncHandler');

exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  const ordersWithUserNames = await Promise.all(
    orders.map(async (order) => {
      const user = await User.findById(order.user);
      return {
        ...order.toObject(),
        userOrder: user ? user.name : 'Unknown User',
      };
    })
  );

  res.json({ orders: ordersWithUserNames });
});
exports.viewOrders = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw new CustomError.BadRequestError('Order ID is required');
  }

  const order = await Order.findById(id);

  if (!order) {
    throw new CustomError.NotFoundError('Order not found');
  }

  res.json({ order });
});

exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.body;

  if (!id) {
    throw new CustomError.BadRequestError('Order ID is required');
  }

  const order = await Order.findById(id);

  if (!order) {
    throw new CustomError.NotFoundError('Order not found');
  }

  order.status = status;
  await order.save();

  res.json({ order });
});

// In OrderController.js

exports.updateOrder = asyncHandler(async (req, res) => {
  const {
    pickupLocation,
    pickupLocationType,
    PickupOtherCategory,
    DestinationLocationType,
    DestinationOtherCategory,
    DestinationLocation,
    items,
    selectedTeam,
  } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new CustomError.NotFoundError('Order not found');
  }

  order.pickupLocation = pickupLocation || order.pickupLocation;
  order.pickupLocationType = pickupLocationType || order.pickupLocationType;
  order.PickupOtherCategory = PickupOtherCategory || order.PickupOtherCategory;
  order.DestinationLocationType =
    DestinationLocationType || order.DestinationLocationType;
  order.DestinationOtherCategory =
    DestinationOtherCategory || order.DestinationOtherCategory;
  order.DestinationLocation = DestinationLocation || order.DestinationLocation;
  order.items = items || order.items;
  order.selectedTeam = selectedTeam || order.selectedTeam;

  await order.save();

  res.json({ message: 'Order updated successfully', order });
});

// place order

exports.placeOrder = asyncHandler(async (req, res) => {
  const user = req.user.id;

  if (!user) {
    throw new CustomError.UnauthorizedError('Unauthorized access');
  }

  const {
    pickupLocation,
    pickupLocationType,
    PickupOtherCategory,
    DestinationLocationType,
    DestinationOtherCategory,
    DestinationLocation,
    items,
    selectedTeam,
  } = req.body;

  const order = new Order({
    user: user,
    pickupLocation,
    pickupLocationType,
    PickupOtherCategory,
    DestinationLocationType,
    DestinationOtherCategory,
    DestinationLocation,
    items,
    selectedTeam,
  });

  await order.save();

  res.json({ message: 'Order placed successfully', order });
});
