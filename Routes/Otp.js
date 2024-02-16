const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Otp = require("../schema/Otp");
const Users = require("../schema/Users");
const generateOtp = require("../modules/generateOtp");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Add data
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;

    //! Check if user is already present
    const checkUserPresent = await Users.findOne({ email: email });
    if (checkUserPresent) {
      return res
        .status(401)
        .json({
          message: "This Email is Already Registered",
        })
        .end();
    }
    let otpData = {
      email: req.body.email,
      otp: await generateOtp(),
    };
    await Otp.create(otpData);
    res.json({ message: "OTP Sent Successfully", otp: otpData.otp });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

router.post("/verify", async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;

    const otpRecord = await Otp.findOne({ email: email, otp: otp });

    if (!otpRecord) {
      return res.status(401).json({
        message: "OTP Mis-match or Expired",
      });
    } else {
      return res.json({
        message: "OTP Verified Successfully",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
