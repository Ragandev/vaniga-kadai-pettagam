const mangoose = require("mangoose");
const Schema = mangoose.Schema();

const pricingSchema = new Schema({
  itemid: {
    type: mangoose.Types.ObjectId,
    required: true
  },
  usertype: {
    type: mangoose.Types.ObjectId,
    required: true
  },
  pricepercentage: {
    type: Number,
    required: true
  }
});

module.exports = mangoose.model("pricing", pricingSchema);
