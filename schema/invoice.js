const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoicenumber: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default:Date.now,
    required: true
  },
  orderid: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "orders"
  },
  transactionid: {
    type: String
  }
});

module.exports = mongoose.model("invoice", invoiceSchema);


