const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Price = require("../schema/pricing");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await Price.find().populate(["usertype","itemid"]);
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single User data
router.get("/:id", async (req, res) => {
  try {
    const priceId = req.params.id;
    const price = await Price.findById(priceId);

    if (!price) {
      return res.status(404).json({ message: "Price not found" });
    }

    res.json(price);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add  User data
router.post("/", async (req, res) => {
  try {
    const {usertype , itemid} = req.body
    const checkExists = await Price.findOne({usertype , itemid})

    if(checkExists){
      return res.status(400).json({ message: "Alerady Exists" })
    }
    await Price.create(req.body);
    res.json({ message: "Price Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit User data
router.put("/:id", async (req, res) => {
  try {
    const priceId = req.params.id;
    const priceData = req.body;

    const {usertype , itemid} = req.body
    const checkExists = await Price.findOne({usertype , itemid})

    if(checkExists){
      return res.status(400).json({ message: "Alerady Exists" })
    }

    const updatedPrice = await Price.findByIdAndUpdate(priceId, priceData, {
      new: true,
    });

    if (!updatedPrice) {
      return res.status(404).json({ message: "Price not found" });
    }

    res.json({ message: "Price Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete User
router.delete("/:id", async (req, res) => {
  try {
    const priceId = req.params.id;
    const price = await Price.findById(priceId);

    if (!price) {
      return res.status(404).json({ message: "Price not found" });
    }

    await price.deleteOne();

    res.json({ message: "Price deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;