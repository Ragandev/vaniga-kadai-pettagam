const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: 1,
  },
});

module.exports = mongoose.model("categories", categoriesSchema);
