const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const offerSchema = new Schema({
  usertype: {
    type: [mongoose.Types.ObjectId],
    required: true,
  },
  offerfor: {
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
  status: {
    type: Boolean,
    default: 1,
  },
});

module.exports = mongoose.model("brands", offerSchema);
