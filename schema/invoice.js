const mongoose = require("mongoose");
const Schema = mangoose.Schema();

const invoiceSchema = new Schema({
  invoicenumber: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default:()=>{Date.now},
    required: true
  },
  orderid: {
    type: mongoose.Types.ObjectID
  },
  transactionid: {
    type: String
  }
});

module.exports = mongoose.model("invoice", invoiceSchema);


