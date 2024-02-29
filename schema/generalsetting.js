const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pincode: {
    type: Number,
  },
});

const bankSchema = new mongoose.Schema({
  bankname: {
    type: String,
  },
  accountnumber: {
    type: Number,
  },
  accountholdername: {
    type: String,
  },
  branchname: {
    type: String,
  },
});

const generalsettingSchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  address: addressSchema,
  phonenumber: {
    type: Number,
  },
  email: {
    type: String,
  },
  gstnumber: {
    type: String,
  },
  paymentlink: {
    type: String,
  },
  bankdetails: bankSchema,
});

module.exports = mongoose.model("generalsetting", generalsettingSchema);
