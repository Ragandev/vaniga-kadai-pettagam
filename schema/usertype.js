const mongoose = require("mongoose");

const usertypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("usertype", usertypeSchema);
