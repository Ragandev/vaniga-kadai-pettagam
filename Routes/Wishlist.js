const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Wishlist = require("../schema/wishlist");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All User Data
router.get("/", async (req, res) => {
  try {
    const data = await Wishlist.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single User data
router.get("/:id", async (req, res) => {
  try {
    const wishlistId = req.params.id;
    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.json(wishlist);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add  User data
router.post("/", async (req, res) => {
  try {
    await Wishlist.create(req.body);
    res.json({ message: "Wishlist Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit User data
router.put("/:id", async (req, res) => {
  try {
    const wishlistId = req.params.id;
    const wishlistData = req.body;

    const updatedWhishlist = await Wishlist.findByIdAndUpdate(wishlistId, wishlistData, {
      new: true,
    });

    if (!updatedWhishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.json({ message: "Wishlist Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete User
router.delete("/:id", async (req, res) => {
  try {
    const wishlistId = req.params.id;
    const wishlist = await Wishlist.findById(wishlistId);

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    await wishlist.deleteOne();

    res.json({ message: "Wishlist deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;