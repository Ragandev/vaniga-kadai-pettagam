const mongoose = require("mongoose");
require("dotenv").config();

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  status: {
    type: Boolean,
    default: 1,
  },
});
module.exports = mongoose.model("categories", categoriesSchema);
