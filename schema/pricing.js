const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  itemid: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "items"
  },
  usertype: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "usertypes"
  },
  pricepercentage: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("pricing", pricingSchema);
