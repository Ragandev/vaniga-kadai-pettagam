const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const shopcat3 = require("../schema/shopbycategory3");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await shopcat3.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

router.put("/:id", async (req, res) => {
    try {
      const bannerId = req.params.id;
      const bannerData = req.body;
  
      const updatedPs = await shopcat3.findByIdAndUpdate(bannerId, bannerData, {
        new: true,
      });
  
      if (!updatedPs) {
        return res.status(404).json({ message: "Banner settings not found" });
      }
  
      res.json({ message: "Banner settings Updated Successfully" });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: errMessage }).end();
    }
  });



module.exports = router;