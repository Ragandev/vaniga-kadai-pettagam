const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Routes
const userRoute = require("./Routes/User");
const categoryRoute = require("./Routes/Categories");
const subCategoriesRoute = require("./Routes/SubCategories");
const brandRoute = require("./Routes/Brand");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// User Code
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/subcategory", subCategoriesRoute);
app.use("/api/brand", brandRoute);


app.get("/", (req, res) => {
  res.status(200).send("<h1>HELLO API</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`Running on Port ${process.env.PORT}`);
});
