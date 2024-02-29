const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const shopbycategorytwoSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("shopbycategory2", shopbycategorytwoSchema);


