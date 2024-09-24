
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


// Register a new user
// POST /auth/register
// Public

const registerUser = async (req, res) => {
    try {
        const { name, email,idNumber,role,phone, password } = req.body;

        // Check if customer already exists
        const isUserAvailable = await User.findOne({ email });
        if (isUserAvailable) {
            return res.status(400).json({ message: 'user already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new customer
        const newUser = new User({
            name,
            email,
            idNumber,
            role,
            phone,
            password: hashedPassword,
        });

        await newUser.save();
        const UserDetails = newUser.toObject();

        UserDetails.password = undefined;
    
        res.status(201).json(UserDetails);
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login a user
// POST /auth/login
// Public
const loginUser = async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        const query = email ? { email } : { phone };
        
        // Check if customer exists
        const user = await User.findOne(query);

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { id: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        user.password = undefined;
        res.status(200).json({ token , user});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = { registerUser, loginUser };
