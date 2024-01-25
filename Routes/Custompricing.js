const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Custompricing = require("../schema/custompricing");
dbConnect();

const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await Custompricing.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single User data
router.get("/:id", async (req, res) => {
  try {
    const cpId = req.params.id;
    const cp = await Custompricing.findById(cpId);

    if (!cp) {
      return res.status(404).json({ message: "Custom pricing not found" });
    }

    res.json(cp);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add  User data
router.post("/", async (req, res) => {
  try {
    await Custompricing.create(req.body);
    res.json({ message: "Custom pricing Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit User data
router.put("/:id", async (req, res) => {
  try {
    const cpId = req.params.id;
    const updateData = req.body;

    const updatedCp = await Custompricing.findByIdAndUpdate(cpId, updateData, {
      new: true,
    });

    if (!updatedCp) {
      return res.status(404).json({ message: "Custom pricing not found" });
    }

    res.json({ message: "Custom pricing Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete User
router.delete("/:id", async (req, res) => {
  try {
    const cpId = req.params.id;
    const cp = await Custompricing.findById(cpId);

    if (!cp) {
      return res.status(404).json({ message: "Custom pricing not found" });
    }

    await cp.deleteOne();

    res.json({ message: "Custom pricing deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;
