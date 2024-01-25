const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const tax = require("../schema/tax");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await tax.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single User data
router.get("/:id", async (req, res) => {
  try {
    const taxId = req.params.id;
    const taxs = await tax.findById(taxId);

    if (!taxs) {
      return res.status(404).json({ message: "Tax not found" });
    }

    res.json(taxs);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add  User data
router.post("/", async (req, res) => {
  try {
    await tax.create(req.body);
    res.json({ message: "Tax Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit User data
router.put("/:id", async (req, res) => {
  try {
    const taxId = req.params.id;
    const taxData = req.body;

    const updatedTax = await tax.findByIdAndUpdate(taxId, taxData, {
      new: true,
    });

    if (!updatedTax) {
      return res.status(404).json({ message: "Tax not found" });
    }

    res.json({ message: "Tax Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete User
router.delete("/:id", async (req, res) => {
  try {
    const taxId = req.params.id;
    const taxs = await tax.findById(taxId);

    if (!taxs) {
      return res.status(404).json({ message: "Tax not found" });
    }

    await taxs.deleteOne();

    res.json({ message: "Tax deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;