const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pincode: {
    type: Number,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 20,
  },
  dob: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  billingaddress: addressSchema,
  shippingaddress: addressSchema,
  usertype: {
    type: String,
    required: true,
    ref: "usertypes",
  },
  balance: {
    type: Number,
  },
  createdat: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  modifiedat: {
    type: Date,
    default: Date.now,
  },
  lastlogin: {
    type: Date,
  },
  status: {
    type: Boolean,
    default: 1,
  },
  verified: {
    type: Boolean,
    default: 0,
  },
});

module.exports = mongoose.model("users", userSchema);
