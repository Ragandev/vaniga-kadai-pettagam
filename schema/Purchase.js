const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "item",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  purchaseamount: {
    type: Number,
    required: true,
  },
  salesamount: {
    type: Number,
  },
  manufacturedate: {
    type: Date,
  },
  expirydate: {
    type: Date,
  },
});

const purchaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [itemsSchema],
  total: {
    type: Number,
  },
});

module.exports = mongoose.model("purchase", purchaseSchema);
