const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const shopbycategorythreeSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("shopbycategory3", shopbycategorythreeSchema);


