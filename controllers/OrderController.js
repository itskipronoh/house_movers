const Order = require('../models/OrderModel');

exports.viewOrders = async (req, res) => {
  try {
    const { id } = req.body;
    const order = await Order.findById(id).populate(
      'selectedDriver selectedLabours'
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
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
    res.status(500).json({ message: 'Error updating order', error });
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
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

// place order

exports.placeOrder = async (req, res) => {
  const user = req.user.id;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized access' });
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
