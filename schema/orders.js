const mangoose = require("mangoose");
const Schema = mangoose.Schema();

const orderSchema = new Schema({
  itemid: {
    type: mangoose.Types.ObjectId,
    required: true
  },
  orderid: {
    type: String,
    default: ()=>{Date.now}
  },
  userid: {
    type: mangoose.Types.ObjectId,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  actualprice: {
    type: Number,
    required: true
  },
  saleprice: {
    type: Number,
    required: true
  },
  orderstatus: {
    type: String,
    required: true
  },
  paymentstatus: {
    type: Boolean,
    default: 1,
    required: true
  },
  orderdate: {
    type: Date,
    default: ()=>{Date.now},
    required: true
  },
  deliverydate: {
    type: Date
  }
});

module.exports = mangoose.model("orders", orderSchema);
