const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Offer = require("../schema/Offer");
dbConnect();
const errMessage = "Something went wrong please try again later";
const moment = require('moment');

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await Offer.find().populate([
      "usertype",
      "offerbrand",
      "offeritems",
      "offercategory",
    ]);
    // .populate(["offeritems","offerbrand","offercategory"]);
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single User data
router.get("/:id", async (req, res) => {
  try {
    const offerId = req.params.id;
    const offer = await Offer.findById(offerId);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.json(offer);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add  User data
router.post("/", async (req, res) => {
  try {
    const {
      usertype,
      offerfor,
      offeritems,
      offerbrand,
      offercategory,
      fromdate,
      todate,
    } = req.body;
    
    
    const fromDate = moment(fromdate, 'YYYY-MM-DD');
      const toDate = moment(todate, 'YYYY-MM-DD');
      if (toDate.isSameOrBefore(fromDate)) {
        return res.status(400).json({ message: "End date must be after start date" });
      }


    let checkExists;
    if (offerfor === "Item") {
      checkExists = await Offer.findOne({ usertype, offeritems });
    }
    if (offerfor === "Brand") {
      checkExists = await Offer.findOne({ usertype, offerbrand });
    }
    if (offerfor === "Category") {
      checkExists = await Offer.findOne({ usertype, offercategory });
    }

    if (checkExists) {
      return res.status(400).json({ message: "Alerady Exists" });
    }
    await Offer.create(req.body);
    res.json({ message: "Offer Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit User data
router.put("/:id", async (req, res) => {
  try {
    const offerId = req.params.id;
    const offerData = req.body;
    const currentData = await Offer.findOne({ _id: offerId });
    const { usertype, offerfor, offeritems, offerbrand, offercategory ,fromdate,todate} = req.body;

      const fromDate = moment(fromdate, 'YYYY-MM-DD');
      const toDate = moment(todate, 'YYYY-MM-DD');
      if (toDate.isSameOrBefore(fromDate)) {
        return res.status(400).json({ message: "End date must be after start date" });
      }

    let checkExists;
    if (currentData.offerfor !== offerData.offerfor) {
      if (offerfor === "Item") {
        checkExists = await Offer.findOne({ usertype, offeritems });
      }
      if (offerfor === "Brand") {
        checkExists = await Offer.findOne({ usertype, offerbrand });
      }
      if (offerfor === "Category") {
        checkExists = await Offer.findOne({ usertype, offercategory });
      }
    }

    if (checkExists) {
      return res.status(400).json({ message: "Already Exists" });
    }

    const updatedOffer = await Offer.findByIdAndUpdate(offerId, offerData, {
      new: true,
    });

    if (!updatedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.json({ message: "Offer Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete User
router.delete("/:id", async (req, res) => {
  try {
    const offerId = req.params.id;
    const offer = await Offer.findById(offerId);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    await offer.deleteOne();

    res.json({ message: "Offer deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;
