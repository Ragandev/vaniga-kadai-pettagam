const mongoose = require("mongoose");
const Schema = mangoose.Schema();

const paymentsettingSchema = new Schema({
  securitykey: {
    type: String,
    required: true
  },
  apikey: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("paymentsetting", paymentsettingSchema);

