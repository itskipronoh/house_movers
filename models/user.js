const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    idNumber:{
        type: String,
        unique: true,
        
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: [true, 'Please provide a role'],
        enum: {
            values: ['customer', 'employee', 'team'],
            message: '{VALUE} is not a valid role'
        }
    },
    password: {
        type: String,
        required: true,
    },
  
   
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
