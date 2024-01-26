const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: "users"
  },
  productid: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: "items"
  }
});

module.exports = mongoose.model("wishlist", wishlistSchema);


