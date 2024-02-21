const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const AdminUser = require("../schema/AdminUser");
const bcrypt = require("bcrypt");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Login
router.post("/login", async (req, res) => {
  try {
    const user = await AdminUser.find({ username: req.body.username });

    if (!user) {
      res.status(401).json({ message: "Invalid Username" });
    } else {
      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordMatch) {
        res.status(401).json({ message: "Invalid Password" });
      } else {
        res.status(200).json({ message: "User Verified", user });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await AdminUser.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single User data
router.get("/:id", async (req, res) => {
  try {
    const adminUserId = req.params.id;
    const adminUser = await AdminUser.findById(adminUserId);

    if (!adminUser) {
      return res.status(404).json({ message: "Admin User not found" });
    }

    res.json(adminUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add  User data
router.post("/", async (req, res) => {
  try {
    await AdminUser.create(req.body);
    res.json({ message: "Brand Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit User data
router.put("/:id", async (req, res) => {
  try {
    const adminUserId = req.params.id;
    const adminUserData = req.body;

    const updatedAdminUser = await AdminUser.findByIdAndUpdate(
      adminUserId,
      adminUserData,
      {
        new: true,
      }
    );

    if (!updatedAdminUser) {
      return res.status(404).json({ message: "Admin User not found" });
    }

    res.json({ message: "Admin User Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete User
router.delete("/:id", async (req, res) => {
  try {
    const adminUserId = req.params.id;
    const adminUser = await Brands.findById(adminUserId);

    if (!adminUser) {
      return res.status(404).json({ message: "Admin User not found" });
    }

    await adminUser.deleteOne();

    res.json({ message: "Admin User deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;
