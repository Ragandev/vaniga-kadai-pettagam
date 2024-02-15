const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Mail = require("../schema/mailsettings");
dbConnect();
const errMessage = "Something went wrong please try again later";

//! Get All Mail Data
router.get("/", async (req, res) => {
  try {
    const data = await Mail.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Get Single Mail data
router.get("/:id", async (req, res) => {
  try {
    const mailId = req.params.id;
    const mail = await Mail.findById(mailId);

    if (!mail) {
      return res.status(404).json({ message: "Mail not found" });
    }

    res.json(mail);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Add  Mail data
router.post("/", async (req, res) => {
  try {
    await Mail.create(req.body);
    res.json({ message: "Mail Created Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Edit Mail data
router.put("/:id", async (req, res) => {
  try {
    const mailId = req.params.id;
    const mailData = req.body;

    const updatedMail = await Mail.findByIdAndUpdate(mailId, mailData, {
      new: true,
    });

    if (!updatedMail) {
      return res.status(404).json({ message: "Mail not found" });
    }

    res.json({ message: "Mail Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

//! Delete Mail
router.delete("/:id", async (req, res) => {
  try {
    const mailId = req.params.id;
    const mail = await Mail.findById(mailId);

    if (!mail) {
      return res.status(404).json({ message: "Mail not found" });
    }

    await mail.deleteOne();

    res.json({ message: "Mail deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
});

module.exports = router;