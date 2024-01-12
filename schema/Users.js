const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const addressSchema = new Schema({
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

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    lowercase: true,
    min:5,
    max:20
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  billingaddress: addressSchema,
  shippingaddress: addressSchema,
  usertype: {
    type: mangoose.Types.ObjectID,
    required: true,
  },
  balance:{
    type: Number
  },
  createdat: {
    type: Date,
    default: ()=>{Date.now}
  },
  modifiedat: {
    type: Date,
    default: ()=>{Date.now}
  },
  lastlogin: {
    type: Date,
  },
  status: {
    type: Boolean,
    default: 1
  }
});

module.exports = mongoose.model("users", userSchema);
