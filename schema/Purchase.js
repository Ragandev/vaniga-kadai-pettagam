const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
  },
  items: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "item",
    required: true,
  },
  qty:{
    type: Number,
    required: true,
  },
  qty:{
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("purchase", purchaseSchema);
