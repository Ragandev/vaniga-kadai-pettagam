const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Routes
const userRoute = require("./Routes/User");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// User Code
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.status(200).send("<h1>HELLO API</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`Running on Port ${process.env.PORT}`);
});
