const Order = require('../models/OrderModel');
const CustomError = require('../errors');
const User = require('../models/user');

exports.getAllOrders = async (req, res) => {
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
};



exports.viewOrders = async (req, res) => {
  try {
    const { id } = req.body;
    const order = await Order.findById(id).populate(
      'selectedDriver selectedLabours'
    );
    res.json(order);
  } catch (error) {
    throw new CustomError.BadRequestError('Not found');
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { orderId, selectedDriver, selectedLabours } = req.body;
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { selectedDriver, selectedLabours },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    throw new CustomError.BadRequestError('Error updating order');
  }
};

// In OrderController.js

exports.updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) {
      throw new CustomError.NotFoundError('Order not found');
    }
    res.json(order);
  } catch (error) {
    throw new CustomError.BadRequestError('Failed to update order status');
  }
};

// place order

exports.placeOrder = async (req, res) => {
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
};
