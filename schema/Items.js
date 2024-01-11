const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  specs: {
    type: String,
    required: true,
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
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdat: {
    type: Date,
    default: () => {
      Date.now;
    },
  },
  createdby: {
    type: mongoose.Types.ObjectId,
  },
  modifiedby: {
    type: mongoose.Types.ObjectId,
  },
  modifiedat: {
    type: Date,
    default: () => {
      Date.now;
    },
  },
  img: {
    type: [String],
    required: true,
  },
  stockqty: {
    type: number,
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
