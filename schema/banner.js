const mangoose = require("mangoose");
const Schema = mangoose.Schema();

const bannerSchema = new Schema({
  img: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mangoose.model("banner", bannerSchema);


