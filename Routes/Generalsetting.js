const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const General = require("../schema/generalsetting");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await General.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit User data
router.put("/:id", async (req, res) => {
  try {
    const gsId = req.params.id;
    const gsData = req.body;

    const updatedGs = await General.findByIdAndUpdate(gsId, gsData, {
      new: true,
    });

    if (!updatedGs) {
      return res.status(404).json({ message: "General settings not found" });
    }

    res.json({ message: "General settings Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});


module.exports = router;