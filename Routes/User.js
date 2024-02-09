const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const mail = require("../modules/mailsender");
const Users = require("../schema/Users");
const Otp = require("../schema/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
dbConnect();

const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await Users.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single User data
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! OTP Send
router.post("/otp", async (req, res) => {
  try {
    const email = req.body.email;

    //! Check if user is already present
    const checkUserPresent = await Users.findOne({ email: email });
    if (checkUserPresent) {
      return res.status(401).json({
        message: "This Email is Already Registered",
      });
    }

    //! Generate Otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    //! Check if OTP is already present
    let result = await OTP.findOne({ otp: otp });
    // if(result)

    mail(req.body.email, "Test", "<h1>Registered Successfully</h1>").catch(
      console.error
    );
    res.json({ message: "User Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});
//! Signup
router.post("/singnup", async (req, res) => {
  try {
    await Users.create(req.body);
    mail(req.body.email, "Test", "<h1>Registered Successfully</h1>").catch(
      console.error
    );
    res.json({ message: "User Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit User data
router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const updatedUser = await Users.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete User
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;
