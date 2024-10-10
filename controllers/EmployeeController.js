const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/user');

// Login employee
const loginEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if employee exists
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { id: employee._id, name: employee.name, role: employee.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { loginEmployee };
