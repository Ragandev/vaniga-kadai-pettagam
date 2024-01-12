const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const couponSchema = new Schema({
  usertype: {
    type: [mongoose.Types.ObjectId],
    required: true,
  },
  couponfor: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  fromdate: {
    type: Date,
    required: true,
  },
  todate: {
    type: Date,
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

module.exports = mongoose.model("coupos", couponSchema);