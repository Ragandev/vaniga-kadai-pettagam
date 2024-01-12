const express = require("express");
const router = express.Router();
const dbConnect = require("../config/db");
const Users = require("../schema/Users");
dbConnect();

router.get("/", (req, res) => {
  const getUser = async () => {
    const data = await Users.find({ name: "Keerthana" });
    console.log(data);
    res.json(data);
  };
  getUser()
    .then(() => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.end();
    });
});

router.post("/", (req, res) => {
  const userInsert = async () => {
    await Users.create({
      name: "Keerthana",
      username: "keerthi",
      password: "K1402",
      dob: Date.now(),
      email: "keerthi@gmail.com",
      mobile: 9874125638,
      usertype: "gsadjsha00454875400",
      balance: 40,
      lastlogin: Date.now(),
    });
  };
  userInsert()
    .then(() => {
      console.log("Inserted Successfully");
      res.end();
    })
    .catch((err) => {
      console.log(err.message);
      res.end();
    });
});

router.put("/", (req, res) => {
  res.send("Hello Put");
});

router.delete("/", (req, res) => {
  res.send("Hello Delete");
});

module.exports = router;
