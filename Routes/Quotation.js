const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Quotation = require("../schema/Quotation");
const InvoiceSettings = require("../schema/invoiceSettings");
const GeneralSettings = require("../schema/generalsetting");
const generatePdf = require("../modules/generatePdf");
const moment = require("moment");
require("dotenv").config();
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All Quotations Data
router.get("/", async (req, res) => {
  try {
    const data = await Quotation.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single Quotation data
router.get("/:id", async (req, res) => {
  try {
    const quotationID = req.params.id;
    const quotation = await Quotation.findById(quotationID);

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.json(quotation);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add Quotation data
router.post("/", async (req, res) => {
  try {
    let company = await GeneralSettings.findOne();
    let invoiceData = await InvoiceSettings.findOne();

    const momentDate = moment();
    const dateNow = momentDate.format("DD-MM-YYYY");

    let invoice = {
      number: `${invoiceData.quotationnumberprefix}-${
        invoiceData.quotationnumber + 1
      }`,
      date: req.body.quote.date,
      terms: invoiceData.terms,
      sign: invoiceData.sign,
      name: `${invoiceData.quotationnumberprefix}-${
        invoiceData.quotationnumber + 1
      }-${dateNow}`,
    };

    let data = {
      company,
      invoice,
      logopath: process.env.BASEURL + "uploads/logo/",
      signpath: process.env.BASEURL + "uploads/sign/",
      ...req.body.quote,
    };

    let dbData = {
      ...req.body.database,
      file: invoice.name,
    };

    generatePdf(data)
      .then(async () => {
        await Quotation.create(dbData);
        res.json({ message: "Quotation Created Successfully" });
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        res.json({ message: errMessage });
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit Quotation data
router.put("/:id", async (req, res) => {
  try {
    let company = await GeneralSettings.findOne();
    let invoiceData = await InvoiceSettings.findOne();

    const momentDate = moment();
    const dateNow = momentDate.format("DD-MM-YYYY");

    let invoice = {
      number: `${invoiceData.quotationnumberprefix}-${
        invoiceData.quotationnumber + 1
      }`,
      date: req.body.quote.date,
      terms: invoiceData.terms,
      sign: invoiceData.sign,
      name: `${invoiceData.quotationnumberprefix}-${
        invoiceData.quotationnumber + 1
      }-${dateNow}`,
    };

    let data = {
      company,
      invoice,
      logopath: process.env.BASEURL + "uploads/logo/",
      signpath: process.env.BASEURL + "uploads/sign/",
      ...req.body.quote,
    };

    let dbData = {
      ...req.body.database,
      file: invoice.name,
    };

    const quotationId = req.params.id;

    generatePdf(data)
      .then(async () => {
        const updatedQuotation = await Quotation.findByIdAndUpdate(
          quotationId,
          dbData,
          {
            new: true,
          }
        );
        if (!updatedQuotation) {
          return res.status(404).json({ message: "Quotation not found" });
        }
        res.json({ message: "Quotation Updated Successfully" });
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        res.json({ message: errMessage });
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete Quotation
router.delete("/:id", async (req, res) => {
  try {
    const quotationId = req.params.id;
    const quotation = await Quotation.findById(quotationId);

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    await Quotation.deleteOne();

    res.json({ message: "Quotation deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;
