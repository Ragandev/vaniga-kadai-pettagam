const mongoose = require("mongoose");

const shopbycategoryoneSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
  },
  url: {
    type: String,
  },
});

module.exports = mongoose.model("shopbycategory1", shopbycategoryoneSchema);
