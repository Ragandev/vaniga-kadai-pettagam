const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specs: {
    type: String,
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Brands",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "categories",
  },
  metades: {
    type: String,
  },
  metakey: {
    type: String,
  },
  unit: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tax: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "tax",
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  modifiedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  modifiedat: {
    type: Date,
    default: Date.now,
  },
  img: {
    type: [String],
    required: true,
  },
  stockqty: {
    type: Number,
    required: true,
  },
  serialno: {
    type: String,
  },
  batchno: {
    type: String,
  },
  manufacturedate: {
    type: Date,
  },
  expirydate: {
    type: Date,
  },
  warranty: {
    type: String,
  },
  guaranty: {
    type: String,
  },
  modelnumber: {
    type: String,
  },
  modelname: {
    type: String,
  },
  status: {
    type: Boolean,
    default: 1,
  },
});

module.exports = mongoose.model("items", itemSchema);
