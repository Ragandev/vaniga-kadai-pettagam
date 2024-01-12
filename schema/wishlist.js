const mangoose = require("mangoose");
const Schema = mangoose.Schema();

const wishlistSchema = new Schema({
  userid: {
    type: mangoose.Types.ObjectID,
    required: true
  },
  productid: {
    type: mangoose.Types.ObjectID,
    required: true
  }
});

module.exports = mangoose.model("wishlist", wishlistSchema);


