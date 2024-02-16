const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const shopbycat1 = require("../schema/shopbycategory1");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await shopbycat1.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single User data
router.get("/:id", async (req, res) => {
  try {
    const shcId = req.params.id;
    const shc = await shopbycat1.findById(shcId);
    if (!shc) {
      return res.status(404).json({ message: "Shopbycategory not found" });
    }
    res.json(shc);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add  User data
router.post("/", async (req, res) => {
  try {
    await shopbycat1.create(req.body);
    res.json({ message: "Shopbycategory Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit User data
router.put("/:id", async (req, res) => {
  try {
    const shcId = req.params.id;
    const shcData = req.body;

    const updatedSch = await shopbycat1.findByIdAndUpdate(shcId, shcData, {
      new: true,
    });

    if (!updatedSch) {
      return res.status(404).json({ message: "Shopbycategory not found" });
    }

    res.json({ message: "Shopbycategory Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete User
router.delete("/:id", async (req, res) => {
  try {
    const shcId = req.params.id;
    const shc = await shopbycat1.findById(shcId);

    if (!shc) {
      return res.status(404).json({ message: "Shopbycategory not found" });
    }

    await shc.deleteOne();

    res.json({ message: "Shopbycategory deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;