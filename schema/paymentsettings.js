const mangoose = require("mangoose");
const Schema = mangoose.Schema();

const paymentsettingSchema = new Schema({
  securitykey: {
    type: String,
    required: true
  },
  apikey: {
    type: String,
    required: true
  }
});

module.exports = mangoose.model("paymentsetting", paymentsettingSchema);

