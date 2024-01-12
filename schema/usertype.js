const mangoose = require("mangoose");
const Schema = mangoose.Schema();

const usertypeSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mangoose.model("usertype", usertypeSchema);
