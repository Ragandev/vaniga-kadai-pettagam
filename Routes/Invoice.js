const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Invoice = require("../schema/invoice");
const moment = require("moment");
const company = require("../schema/generalsetting");
const invoiceSettings = require("../schema/invoiceSettings");
const generatePdf = require("../modules/generatePdf");
const invoice = require("../schema/invoice");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Generate Invoice
router.post("/generate", async (req, res) => {
  try {
    const momentDate = moment();
    const dateNow = momentDate.format("DD-MM-YYYY");

    let orderId = req.body.orderid;
    let transactionid = req.body.transactionid ? req.body.transactionid : "";

    let settings = await invoiceSettings.findOne();

    let invoiceNumber = `${settings.invoicenumberprefix}-${
      settings.invoicenumber + 1
    }`;

    let fileName = `${invoiceNumber}-${dateNow}.pdf`;

    let invoiceDataPDf = {
      number: invoiceNumber,
      date: dateNow,
      sign: settings.sign,
    };
    
    const companyData = await company.findOne();

    let invoiceData = {
      orderid: orderId,
      transactionid: transactionid,
      file: fileName,
    };

    let data = {
      company: companyData,
      invoice: invoiceDataPDf,
      ...req.body.invoice,
    };

    generatePdf(data);
    await invoice.create(invoiceData);
    res.status(200).json({ message: "Invoice Saved" }).end();
    
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await Invoice.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single User data
router.get("/:id", async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(invoice);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add  User data
router.post("/", async (req, res) => {
  try {
    await Invoice.create(req.body);
    res.json({ message: "Invoice Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit User data
router.put("/:id", async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoiceData = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      invoiceData,
      {
        new: true,
      }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json({ message: "Invoice Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete User
router.delete("/:id", async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    await invoice.deleteOne();

    res.json({ message: "Invoice deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;
