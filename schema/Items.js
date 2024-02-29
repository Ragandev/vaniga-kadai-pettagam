const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  size: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});
const variantSchema = new mongoose.Schema({
  color: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  img:{
    type: [String],
  },
  variantsizes:[sizeSchema]
});

const variantsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
    enum: ["color", "quantity"],
  },
  variant:[variantSchema]
});

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
  sizes:[sizeSchema],
  variants:[variantsSchema],
  ingredient:{
    type:String
  },
  color:{
    type:String
  },
  material:{
    type:String
  },
  dimension:{
    type:String
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
