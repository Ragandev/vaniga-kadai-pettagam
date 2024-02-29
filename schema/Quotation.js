const mongoose = require("mongoose");
const InvoiceSettings = require("./invoiceSettings");

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

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  address: addressSchema,
});

const itemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "item",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  taxamount: {
    type: Number,
  },
  subtotal: {
    type: Number,
  },
});

const quotationSchema = new mongoose.Schema({
  client: clientSchema,
  quotationnumber: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  items: [itemSchema],
  taxtotal: Number,
  itemtotal: Number,
  total: Number,
});

quotationSchema.pre("save", async function (next) {
  const doc = this;

  try {
    const settings = await InvoiceSettings.findOne();
    if (!settings) {
      throw new Error("Invoice settings not found.");
    }

    settings.quotationnumber += 1;

    await settings.save();

    doc.quotationnumber = `${settings.quotationnumberprefix}-${settings.quotationnumber}`;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("quotation", quotationSchema);
