const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const bannerSchema = new Schema({
  img: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("banner", bannerSchema);


