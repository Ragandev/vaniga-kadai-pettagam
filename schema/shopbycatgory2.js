const mangoose = require("mangoose");
const Schema = mangoose.Schema();

const shopbycategorytwoSchema = new Schema({
  img: {
    type: String,
    required: true
  },
  category: {
    type: mangoose.Types.ObjectId
  }
});

module.exports = mangoose.model("shopbycategory2", shopbycategorytwoSchema);


