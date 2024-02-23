const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
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