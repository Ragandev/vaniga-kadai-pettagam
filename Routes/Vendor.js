const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const vendor = require("../schema/Vendor");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await vendor.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single User data
router.get("/:id", async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendordata = await vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json(vendordata);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add  User data
router.post("/", async (req, res) => {
  try {
    const {name} = req.body
    const checkExists = await vendor.findOne({name});
    if (checkExists) {
        return res.status(400).json({ message: "Name already exists" });
      } 
    await vendor.create(req.body);
    res.json({ message: "Vendor Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit User data
router.put("/:id", async (req, res) => {
  try {
    const vendorId = req.params.id;
    const currentData = await vendor.findOne({ _id: vendorId });
    const vendorData = req.body;

    let checkExists;
    if(currentData?.name !== vendorData?.name){
      checkExists = await vendor.findOne({ name: vendorData.name });
    }
    if (checkExists) {
        return res.status(400).json({ message: "Already Exists" });
    }
    
    const updatedVendor = await vendor.findByIdAndUpdate(vendorId, vendorData, {
      new: true,
    });

    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json({ message: "Vendor Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete User
router.delete("/:id", async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendor = await vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    await vendor.deleteOne();

    res.json({ message: "Vendor deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;