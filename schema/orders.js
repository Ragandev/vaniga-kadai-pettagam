const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const orderSchema = new Schema({
  itemid: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  orderid: {
    type: String,
    default: ()=>{Date.now}
  },
  userid: {
    type: mongoose.Types.ObjectId,
    required: true
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
    default: 1,
    required: true
  },
  orderdate: {
    type: Date,
    default: ()=>{Date.now},
    required: true
  },
  deliverydate: {
    type: Date
  }
});

module.exports = mongoose.model("orders", orderSchema);
