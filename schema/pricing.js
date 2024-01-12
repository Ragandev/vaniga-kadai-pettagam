const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const pricingSchema = new Schema({
  itemid: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  usertype: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  pricepercentage: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("pricing", pricingSchema);
