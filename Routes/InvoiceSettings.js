const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const InvoiceSettings = require("../schema/invoiceSettings");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await InvoiceSettings.findOne();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const invoiceSettingsId = req.params.id;
    const invoiceSettingsData = req.body;

    const updatedPInvoiceSettings = await banner.findByIdAndUpdate(
      invoiceSettingsId,
      invoiceSettingsData,
      {
        new: true,
      }
    );

    if (!updatedPInvoiceSettings) {
      return res.status(404).json({ message: "Invoice settings not found" });
    }

    res.json({ message: "Invoice settings Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;
