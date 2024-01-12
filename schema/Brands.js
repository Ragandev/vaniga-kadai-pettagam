const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: 1,
  },
});

module.exports = mongoose.model("brands", brandSchema);