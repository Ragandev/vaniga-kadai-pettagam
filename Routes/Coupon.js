const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Coupon = require("../schema/Coupon");
const moment = require('moment');
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await Coupon.find().populate(["couponitems","couponbrand","couponcategory","usertype"]);
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single User data
router.get("/:id", async (req, res) => {
  try {
    const couponId = req.params.id;
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.json(coupon);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add  User data
router.post("/", async (req, res) => {
  try {
    const {usertype ,couponfor, couponitems , couponbrand , couponcategory, fromdate,todate } = req.body
    
    const fromDate = moment(fromdate, 'YYYY-MM-DD');
    const toDate = moment(todate, 'YYYY-MM-DD');
    if (toDate.isSameOrBefore(fromDate)) {
      return res.status(400).json({ message: "End date must be after start date" });
    }

    let checkExists;
    if(couponfor === "Item"){
     checkExists = await Coupon.findOne({usertype , couponitems})
    }
    if(couponfor === "Brand"){
     checkExists = await Coupon.findOne({usertype , couponbrand})
    }
    if(couponfor === "Category"){
     checkExists = await Coupon.findOne({usertype , couponcategory})
    }

    if(checkExists){
      return res.status(400).json({ message: "Alerady Exists" })
    }
    await Coupon.create(req.body);
    res.json({ message: "Coupon Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit User data
router.put("/:id", async (req, res) => {
  try {
    const couponId = req.params.id;
    const couponData = req.body;

    const currentData = await Coupon.findOne({_id: couponId  })
    const {usertype ,couponfor, couponitems , couponbrand , couponcategory, fromdate, todate} = req.body
    
    const fromDate = moment(fromdate, 'YYYY-MM-DD');
    const toDate = moment(todate, 'YYYY-MM-DD');
    if (toDate.isSameOrBefore(fromDate)) {
      return res.status(400).json({ message: "End date must be after start date" });
    }

    let checkExists;
    if(currentData.couponfor !== couponData.couponfor){
      if(couponfor === "Item"){
       checkExists = await Coupon.findOne({usertype , couponitems})
      }
      if(couponfor === "Brand"){
       checkExists = await Coupon.findOne({usertype , couponbrand})
      }
      if(couponfor === "Category"){
       checkExists = await Coupon.findOne({usertype , couponcategory})
      }
    }

    if(checkExists){
      return res.status(400).json({ message: "Alerady Exists" })
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, couponData, {
      new: true,
    });

    if (!updatedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.json({ message: "Coupon Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete User
router.delete("/:id", async (req, res) => {
  try {
    const couponId = req.params.id;
    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    await coupon.deleteOne();

    res.json({ message: "Coupon deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;