const mangoose = require("mangoose");
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
    type: mangoose.Types.ObjectID
  },
  transactionid: {
    type: String
  }
});

module.exports = mangoose.model("invoice", invoiceSchema);


