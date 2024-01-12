const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const usertypeSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("usertype", usertypeSchema);
