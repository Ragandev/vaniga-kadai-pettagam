const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const shopbycategoryoneSchema = new Schema({
  img: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Types.ObjectId
  }
});

module.exports = mongoose.model("shopbycategory1", shopbycategoryoneSchema);