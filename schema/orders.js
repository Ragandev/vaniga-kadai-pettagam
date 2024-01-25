const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  itemid: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "items"
  },
  orderid: {
    type: String,
    default: Date.now
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users"
  },
  qty: {
    type: Number,
    required: true
  },
  actualprice: {
    type: Number,
    required: true
  },
  saleprice: {
    type: Number,
    required: true
  },
  orderstatus: {
    type: String,
    required: true
  },
  paymentstatus: {
    type: Boolean,
    default: 0
  },
  orderdate: {
    type: Date,
    default: Date.now,
    required: true
  },
  deliverydate: {
    type: Date
  }
});

module.exports = mongoose.model("orders", orderSchema);
