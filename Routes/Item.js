const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Items = require("../schema/Items");
const importItem = require("../modules/import");
const upload = require("../modules/upload");
const itemupload = require("../modules/itemUpload");

dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await Items.find().populate(['tax','brand','category']);
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single User data
router.get("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Items.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add  User data
router.post("/", async (req, res) => {
  try {
    await Items.create(req.body);
    res.json({ message: "Item Created Successfully" });
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

    const updatedItem = await Items.findByIdAndUpdate(itemId, itemData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete User
router.delete("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Items.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.deleteOne();

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Import Items
router.post("/import", upload.single("file"), (req, res) => {
  importItem(req.file.filename);
});

// upload item image
router.post("/upload",  itemupload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(404).json({ message: "No File Uploaded" });
    }
    const fileDetails = {
      filename: req.file.filename,
    };
    return res.status(200).json({  message: "File Upload successfully" , file: fileDetails });
  });

module.exports = router;
