const mongoose = require("mongoose");

const mailsettingSchema = new mongoose.Schema({
  servername: {
    type: String,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  port: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("mailsetting", mailsettingSchema);

