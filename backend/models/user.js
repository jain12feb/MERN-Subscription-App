const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is Required"],
      minlength: [3, "Name must be at least three characters long"],
      maxlength: [50, "Name cannot exceed fifty characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      min: 5,
    },
    stripeCustomerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
