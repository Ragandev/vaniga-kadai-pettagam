const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const categoriesSchema = new Schema({
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
