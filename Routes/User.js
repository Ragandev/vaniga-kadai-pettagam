const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const mail = require("../modules/mailsender");
const Users = require("../schema/Users");
const OTP = require("../schema/Otp");
const otpGenerator = require("otp-generator");
const generateOtp = require("../modules/generateOtp");
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

//! Signup
router.post("/singnup", async (req, res) => {
  try {
    await Users.create(req.body);
    let userMsg = `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
      <tr>
        <td>
          <h2 style="color: #333;">Registration Confirmation</h2>
          <p>Dear ${req.body.name},</p>
          <p>Congratulations! You have successfully registered. We are thrilled to have you on board.</p>
          <p>Your account has been created, and you can now start exploring our platform.</p>
          <ul>
            <li>Explore our services and products.</li>
            <li>Customize your profile settings.</li>
            <li>Connect with other users and start engaging.</li>
          </ul>
          <p>If you have any questions or need assistance, feel free to contact us.</p>
          <p>Thank you and welcome aboard!</p>
        </td>
      </tr>
    </table>
  </body>`;
    mail(req.body.email, "Registration Confirmation", userMsg).catch(
      console.error
    );
    res.json({ message: "User Registered Successfully" });
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
