const mongoose = require("mongoose");
require("dotenv").config();

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdat: {
    type: Date,
    default: Date.now,
    expires: 1*60
  }
});
module.exports = mongoose.model("otp", otpSchema);
