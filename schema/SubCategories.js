const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const subCategoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categories: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  status: {
    type: Boolean,
    default: 1,
  },
});

module.exports = mongoose.model("subcategories", subCategoriesSchema);
