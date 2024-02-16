const mongoose = require("mongoose");
const custompricingSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users"
  },
  itemid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "items"
  },
  pricepercentage: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("customprice", custompricingSchema);
