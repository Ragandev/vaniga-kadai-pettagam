const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const itemsettingSchema = new Schema({
  manufacturedate: {
    type: Boolean,
    default: 0
  },
  expirydate: {
    type: Boolean,
    default: 0
  },
  warranty: {
    type: Boolean,
    default: 0
  },
  guaranty: {
    type: Boolean,
    default: 0
  },
  serialnumber:{
    type: Boolean,
    default: 0
  },
  batchnumber:{
    type: Boolean,
    default: 0
  }

});

module.exports = mongoose.model("itemsetting", itemsettingSchema);

