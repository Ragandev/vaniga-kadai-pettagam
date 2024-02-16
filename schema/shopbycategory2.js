const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const shopbycategorytwoSchema = new Schema({
  img: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Types.ObjectId
  }
});

module.exports = mongoose.model("shopbycategory2", shopbycategorytwoSchema);


