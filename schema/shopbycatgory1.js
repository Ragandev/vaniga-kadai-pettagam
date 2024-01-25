const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const shopbycategoryoneSchema = new Schema({
  img: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
  },
  url: {
    type: String,
  },
});

module.exports = mongoose.model("shopbycategory1", shopbycategoryoneSchema);
