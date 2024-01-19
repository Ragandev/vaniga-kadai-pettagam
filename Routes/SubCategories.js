const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const SubCategories = require("../schema/SubCategories");
dbConnect();

const errMessage = "Something went wrong please try again later";

//! Get All Sub Categories Data
router.get("/", async (req, res) => {
  try {
    const data = await SubCategories.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single Sub Categories data
router.get("/:id", async (req, res) => {
  try {
    const SubCategoriesId = req.params.id;
    const SubCategory = await SubCategories.findById(SubCategoriesId);

    if (!SubCategory) {
      return res.status(404).json({ message: "Sub Category not found" });
    }

    res.json(SubCategory);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add Sub Categories data
router.post("/", async (req, res) => {
  try {
    await SubCategories.create(req.body);
    res.json({ message: "Sub Categories Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit Sub Categories data
router.put("/:id", async (req, res) => {
  try {
    const SubCategoriesId = req.params.id;
    const SubCategoryData = req.body;

    const updatedSubCategories = await SubCategories.findByIdAndUpdate(
      SubCategoriesId,
      SubCategoryData,
      {
        new: true,
      }
    );

    if (!updatedSubCategories) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    res.json({ message: "SubCategories Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete Sub Categories
router.delete("/:id", async (req, res) => {
  try {
    const SubCategoriesId = req.params.id;
    const SubCategory = await SubCategories.findById(SubCategoriesId);

    if (!SubCategories) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    await SubCategory.deleteOne();

    res.json({ message: "SubCategory deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;
