const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const wishlistSchema = new Schema({
  userid: {
    type: mongoose.Types.ObjectID,
    required: true
  },
  productid: {
    type: mongoose.Types.ObjectID,
    required: true
  }
});

module.exports = mongoose.model("wishlist", wishlistSchema);


