const mangoose = require("mangoose");
const Schema = mangoose.Schema();

const addressSchema = new Schema({
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

const bankSchema = new Schema({
    bankname: {
      type: String,
    },
    accountnumber: {
      type: Number,
    },
    beneficiaryname: {
      type: String,
    },
    ifsccode: {
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

const generalsettingSchema = new Schema({
  companyname: {
    type: String,
    required: true
  },
  logo: {
    type: String
  },
  address:addressSchema,
  phonenumber:{
    type: Number
  },
  email:{
    type: String
  },
  gstnumber:{
    type: String
  },
  paymentlink:{
    type: String
  },
  bankdetails: bankSchema
});

module.exports = mangoose.model("generalsetting", generalsettingSchema);


