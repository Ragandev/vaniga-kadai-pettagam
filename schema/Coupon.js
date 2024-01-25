const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema({
  usertype: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "usertypes",
  },
  couponfor: {
    type: String,
    enum: ["Category", "Brand", "Item"],
    required: true,
  },
  couponitems: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"items",
    required: ()=>{
      return this.couponfor === "Item"
    },
  },
  couponbrand: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"brands",
    required: ()=>{
      return this.couponfor === "Brand"
    },
  },
  couponcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"categories",
    required: ()=>{
      return this.couponfor === "Category"
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
  couponpercentage: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: 1,
  },
});

module.exports = mongoose.model("coupon", couponSchema);