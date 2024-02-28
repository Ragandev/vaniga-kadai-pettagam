const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Purchase = require("../schema/Purchase");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All Purchase Data
router.get("/", async (req, res) => {
  try {
    const data = await Purchase.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single Purchase data
router.get("/:id", async (req, res) => {
  try {
    const purchaseID = req.params.id;
    const purchase = await Purchase.findById(purchaseID);

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.json(purchase);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});
//! Add  Purchase data
router.post("/", async (req, res) => {
  try {
    await Purchase.create(req.body);
    res.json({ message: "Purchase Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit Purchase data
router.put("/:id", async (req, res) => {
  try {
    const purchaseId = req.params.id;
    const purchaseData = req.body;

    const updatedPurchase = await Purchase.findByIdAndUpdate(
      purchaseId,
      purchaseData,
      {
        new: true,
      }
    );

    if (!updatedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.json({ message: "Purchase Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete Purchase
router.delete("/:id", async (req, res) => {
  try {
    const purchaseId = req.params.id;
    const purchase = await Purchase.findById(purchaseId);

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    await Purchase.deleteOne();

    res.json({ message: "Purchase deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;
