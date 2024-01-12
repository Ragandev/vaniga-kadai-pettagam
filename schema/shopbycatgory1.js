const mangoose = require("mangoose");
const Schema = mangoose.Schema();

const shopbycategoryoneSchema = new Schema({
  img: {
    type: String,
    required: true
  },
  category: {
    type: mangoose.Types.ObjectId
  }
});

module.exports = mangoose.model("shopbycategory1", shopbycategoryoneSchema);


