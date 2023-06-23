const User = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const stripe = require("../utils/stripe");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      success: false,
      error: "Email already in use",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await stripe.customers.create(
      {
        name,
        email,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      stripeCustomerId: customer.id,
    });

    const token = await JWT.sign(
      { email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        name: newUser.name,
        id: newUser._id,
        email: newUser.email,
        stripeCustomerId: customer.id,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid Credentials!",
      });
    }

    const token = await JWT.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        stripeCustomerId: user.stripeCustomerId,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.currentUserDetails = async (req, res) => {
  try {
    const currentUser = await User.findOne({ email: req.user });
    res.status(200).json({
      success: true,
      user: {
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        stripeCustomerId: currentUser.stripeCustomerId,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
