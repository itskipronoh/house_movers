const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    pickupLocationType: {
      type: String,
      required: true,
    },
    PickupOtherCategory: {
      type: String,
      default: '',
    },
    DestinationLocationType: {
      type: String,
      required: true,
    },
    DestinationOtherCategory: {
      type: String,
      default: '',
    },
    DestinationLocation: {
      type: String,
      required: true,
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    selectedTeam: {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      wage: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'completed', 'cancelled'],
      default: 'pending',
    },
  },

  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
