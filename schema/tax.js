const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const taxSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  taxpercentage: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: 1
  }
});

module.exports = mongoose.model("tax", taxSchema);

