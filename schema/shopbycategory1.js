const mongoose = require("mongoose");

const shopbycategoryoneSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("shopbycategory1", shopbycategoryoneSchema);
