const mongoose = require("mongoose");
const itemsettingSchema = new mongoose.Schema({
  manufacturedate: {
    type: Boolean,
    default: 0,
  },
  expirydate: {
    type: Boolean,
    default: 0,
  },
  warranty: {
    type: Boolean,
    default: 0,
  },
  guaranty: {
    type: Boolean,
    default: 0,
  },
  serialnumber: {
    type: Boolean,
    default: 0,
  },
  batchnumber: {
    type: Boolean,
    default: 0,
  },
  color: {
    type: Boolean,
    default: 0,
  },
  size: {
    type: Boolean,
    default: 0,
  },
  material: {
    type: Boolean,
    default: 0,
  },
  dimension: {
    type: Boolean,
    default: 0,
  },
  // width: {
  //   type: Boolean,
  //   default: 0,
  // },

  variant: {
    type: Boolean,
    default: 0,
  },

  colorvariant: { 
    type: Boolean, 
    default: 0 
  },
  quantityvariant: { 
    type: Boolean, 
    default: 0 
  },
  capacityvariant: { 
    type: Boolean, 
    default: 0 
  },
});

module.exports = mongoose.model("itemsetting", itemsettingSchema);
