const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Item = require("../schema/itemsettings");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await Item.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit User data
router.put("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const itemData = req.body;

    const updatedItem = await Item.findByIdAndUpdate(itemId, itemData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item settings not found" });
    }

    res.json({ message: "Item settings Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});


module.exports = router;