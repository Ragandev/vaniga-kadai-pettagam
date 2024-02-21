const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Payment = require("../schema/paymentsettings");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await Payment.findOne();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit User data
router.put("/:id", async (req, res) => {
  try {
    const paymentId = req.params.id;
    const paymentData = req.body;

    const updatedPs = await Payment.findByIdAndUpdate(paymentId, paymentData, {
      new: true,
    });

    if (!updatedPs) {
      return res.status(404).json({ message: "Payment settings not found" });
    }

    res.json({ message: "Payment settings Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});


module.exports = router;