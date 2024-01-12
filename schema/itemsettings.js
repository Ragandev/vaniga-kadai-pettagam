const mangoose = require("mangoose");
const Schema = mangoose.Schema();

const itemsettingSchema = new Schema({
  manufacturedate: {
    type: Boolean,
    default: 1
  },
  expirydate: {
    type: Boolean,
    default: 1
  },
  warranty: {
    type: Boolean,
    default: 1
  },
  guaranty: {
    type: Boolean,
    default: 1
  },
  serialnumber:{
    type: Boolean,
    default: 1
  },
  batchnumber:{
    type: Boolean,
    default: 1
  }

});

module.exports = mangoose.model("itemsetting", itemsettingSchema);

