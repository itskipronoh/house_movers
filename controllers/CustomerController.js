const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require('../models/user');


// Register a new customer
const registerCustomer = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if customer already exists
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Customer already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new customer
        const newCustomer = new Customer({
            name,
            email,
            password: hashedPassword,
            phone
        });

        await newCustomer.save();
        const customerDetails = newCustomer.toObject();
    
        res.status(201).json(customerDetails);
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if customer exists
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { id: customer._id, name: customer.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = { registerCustomer, loginCustomer };
