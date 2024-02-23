const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pincode: {
    type: Number,
  },
});

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  address: addressSchema,
});

const itemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "item",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  tax: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tax",
    required: true,
  },
  subtotal: {
    type: Number,
  },
});

const quotationSchema = new mongoose.Schema({
  client: clientSchema,
  quotationnumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  items: [itemSchema],
  taxtotal: Number,
  itemtotal: Number,
  total: Number,
});

module.exports = mongoose.model("quotation", quotationSchema);
