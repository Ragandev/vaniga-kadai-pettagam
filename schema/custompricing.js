const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const usertypeSchema = new Schema({
  name: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model("usertype", usertypeSchema);
