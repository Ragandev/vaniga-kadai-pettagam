const mongoose = require("mongoose");
const paymentsettingSchema = new mongoose.Schema({
  securitykey: {
    type: String,
    required: true
  },
  apikey: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("paymentsetting", paymentsettingSchema)