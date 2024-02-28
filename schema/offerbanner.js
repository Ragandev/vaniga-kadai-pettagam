const mongoose = require("mongoose");

const offerbannerSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("offerbanner", offerbannerSchema);
