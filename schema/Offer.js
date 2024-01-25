const mongoose = require("mongoose");
const offerSchema = new mongoose.Schema({
  usertype: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "usertypes",
  },
  offerfor: {
    type: String,
    enum: ["Category", "Brand", "Item"],
    required: true,
  },
  offeritems: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"items",
    required: ()=>{
      return this.offerfor === "Item"
    },
  },
  offerbrand: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"brands",
    required: ()=>{
      return this.offerfor === "Brand"
    },
  },
  offercategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"categories",
    required: ()=>{
      return this.offerfor === "Category"
    },
  },
  fromdate: {
    type: String,
    required: true,
  },
  todate: {
    type: String,
    required: true,
  },
  offerpercentage: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: 1,
  },
});

module.exports = mongoose.model("offers", offerSchema);
