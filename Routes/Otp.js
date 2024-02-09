const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Otp = require("../schema/Otp");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get Single data
router.get("/:email", async (req, res) => {
  try {
    const emailId = req.params.id;
    const otp = await Otp.findOne({email:emailId});

    if (!otp) {
      return res.status(404).json({ message: "OTP not found" });
    }

    res.send(otp.otp);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add data
router.post("/", async (req, res) => {
  try {
    await Otp.create(req.body);
    res.json({ message: "OTP Created Successfully" }); 
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});


module.exports = router;