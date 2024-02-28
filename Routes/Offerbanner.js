const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const offerbanner = require("../schema/offerbanner");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await offerbanner.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

router.put("/:id", async (req, res) => {
    try {
      const offerbannerId = req.params.id;
      const offerbannerData = req.body;
  
      const updatedPs = await offerbanner.findByIdAndUpdate(offerbannerId, offerbannerData, {
        new: true,
      });
  
      if (!updatedPs) {
        return res.status(404).json({ message: "Banner settings not found" });
      }
  
      res.json({ message: "Offer Banner settings Updated Successfully" });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: errMessage }).end();
    }
  });



module.exports = router;