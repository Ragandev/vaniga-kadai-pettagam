const mongoose = require("mongoose");

const usertypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discount: Number,
});

module.exports = mongoose.model("usertype", usertypeSchema);
