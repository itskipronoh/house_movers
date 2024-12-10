const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { asyncHandler } = require('../middleware');
const CustomError = require('../errors');

// Register a new user
// POST /auth/register
// Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, idNumber, role, phone, password } = req.body;

  // Check if customer already exists
  const isUserAvailable = await User.findOne({ email });
  if (isUserAvailable) {
    throw new CustomError.BadRequestError('User already exists');
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
});

// Login a user
// POST /auth/login
// Public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    const query = email ? { email } : { phone };

    if (!query) {
      throw new CustomError.BadRequestError('Invalid email or password');
    }

    // Check if customer exists
    const user = await User.findOne(query);

    if (!user) {
      throw new CustomError.BadRequestError('Invalid email or password');
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError.BadRequestError('Invalid email or password');
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    user.password = undefined;
    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    throw new CustomError.BadRequestError('Invalid email or password');
  }
});

// get all users

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = { registerUser, loginUser, getAllUsers };
