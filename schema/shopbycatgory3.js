const mangoose = require("mangoose");
const Schema = mangoose.Schema();

const shopbycategorythreeSchema = new Schema({
  img: {
    type: String,
    required: true
  },
  category: {
    type: mangoose.Types.ObjectId
  }
});

module.exports = mangoose.model("shopbycategory3", shopbycategorythreeSchema);


