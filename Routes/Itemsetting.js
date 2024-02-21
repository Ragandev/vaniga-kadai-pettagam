const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Item = require("../schema/itemsettings");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await Item.findOne();
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

// Toggle checkbox
router.post('/:checkboxName', async (req, res) => {
  const checkboxName = req.params.checkboxName;

  try {
    const itemSettings = await Item.findOne();

    itemSettings[checkboxName] = !itemSettings[checkboxName];
    await itemSettings.save();

    res.status(200).json({ success: true, message: 'Checkbox toggled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error toggling checkbox' });
  }
});


module.exports = router;