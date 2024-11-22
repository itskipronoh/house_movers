const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  idNumber: {
    type: String,
    default: 'N/A',
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: [true, 'Please provide a role'],
    enum: {
      values: ['customer', 'employee', 'team', 'admin'],
      message: '{VALUE} is not a valid role',
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('Users', usersSchema);
module.exports = User;
