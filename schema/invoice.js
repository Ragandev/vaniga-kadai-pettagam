const mongoose = require("mongoose");
const InvoiceSettings = require("./invoiceSettings");

const invoiceSchema = new mongoose.Schema({
  invoicenumber: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  orderid: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "orders",
  },
  transactionid: {
    type: String,
  },
});

invoiceSchema.pre("save", async function (next) {
  const doc = this;

  try {
    const settings = await InvoiceSettings.findOne();
    if (!settings) {
      throw new Error("Invoice settings not found.");
    }

    settings.invoicenumber += 1;

    await settings.save();

    doc.invoicenumber = `${settings.invoicenumberprefix}-${settings.invoicenumber}`;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("invoice", invoiceSchema);
