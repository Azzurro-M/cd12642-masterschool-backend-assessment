//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config({ path: "./env" });
const jwt = require("jsonwebtoken");

// TOKEN SET-UP
const generateToken = (id, time) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: time,
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    token: generateToken(user._id, process.env.JWT_EXPIRES_IN),
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  const token = generateToken(user.id);
  user.password = undefined;
  res.status(200).json({ user, token });
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const logOut = asyncHandler(async (req, res) => {
    const logoutToken = generateToken(id, '1s');
    
})

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
