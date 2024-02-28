const mongoose = require("mongoose");

const invoiceSettingsSchema = new mongoose.Schema({
  invoicenumberprefix: {
    type: String,
  },
  invoicenumber: {
    type: Number,
    default: 0,
  },
  quotationnumberprefix: {
    type: String,
  },
  quotationnumber: {
    type: Number,
    default: 0,
  },
  terms: {
    type: String,
  },
  sign: {
    type: String,
  },
});

module.exports = mongoose.model("invoicesetting", invoiceSettingsSchema);
