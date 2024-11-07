const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: String,
  userDetails: {
    name: String,
    email: String,
    phone: String,
  },
  fromLocations: String,
  toLocations: String,
  itemsDetails: Array,
  status: String,
  selectedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  selectedLabours: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
  ],
});

module.exports = mongoose.model('Order', orderSchema);
