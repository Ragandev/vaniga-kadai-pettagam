const mangoose = require("mangoose");
const Schema = mangoose.Schema();

const taxSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  taxpercentage: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: 1
  }
});

module.exports = mangoose.model("tax", taxSchema);

