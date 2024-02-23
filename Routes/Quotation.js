const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Quotation = require("../schema/Quotation");
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

//! Add  Quotation data
router.post("/", async (req, res) => {
  try {
    await Quotation.create(req.body);
    res.json({ message: "Quotation Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit Quotation data
router.put("/:id", async (req, res) => {
  try {
    const quotationId = req.params.id;
    const quotationData = req.body;

    const updatedQuotation = await Quotation.findByIdAndUpdate(
      quotationId,
      quotationData,
      {
        new: true,
      }
    );

    if (!updatedQuotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    res.json({ message: "Quotation Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete Quotation
router.delete("/:id", async (req, res) => {
  try {
    const quotationId = req.params.id;
    const quotation = await Brands.findById(quotationId);

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
