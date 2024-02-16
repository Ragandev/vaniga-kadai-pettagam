const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    ref: "users",
  },
  phone: {
    type: Number,
    required: true,
    ref: "users",
  },
  problem: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  problemcategory: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  orderid: {
    type: String,
    required: true,
    ref: "orders",
  },
  status: {
    type: String,
    default: 1,
  },
  priority: {
    type: String,
  },
  comments: {
    type: String,
  },
});

module.exports = mongoose.model("ticket", ticketSchema);
