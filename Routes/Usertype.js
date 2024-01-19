const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Usertype = require("../schema/usertype");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await Usertype.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single User data
router.get("/:id", async (req, res) => {
  try {
    const usertypeId = req.params.id;
    const usertype = await Usertype.findById(usertypeId);

    if (!usertype) {
      return res.status(404).json({ message: "Usertype not found" });
    }

    res.json(usertype);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add  User data
router.post("/", async (req, res) => {
  try {
    await Usertype.create(req.body);
    res.json({ message: "Usertype Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit User data
router.put("/:id", async (req, res) => {
  try {
    const usertypeId = req.params.id;
    const usertypeData = req.body;

    const updatedUsertype = await Usertype.findByIdAndUpdate(usertypeId, usertypeData, {
      new: true,
    });

    if (!updatedUsertype) {
      return res.status(404).json({ message: "Usertype not found" });
    }

    res.json({ message: "Usertype Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete User
router.delete("/:id", async (req, res) => {
  try {
    const usertypeId = req.params.id;
    const usertype = await Usertype.findById(usertypeId);

    if (!usertype) {
      return res.status(404).json({ message: "Usertype not found" });
    }

    await Usertype.deleteOne();

    res.json({ message: "Usertype deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;