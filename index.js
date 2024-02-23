const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Routes
const userRoute = require("./Routes/User");
const otpRoute = require("./Routes/Otp");
const usertypeRoute = require("./Routes/Usertype");
const categoryRoute = require("./Routes/Categories");
const brandRoute = require("./Routes/Brand");
const itemRoute = require("./Routes/Item");
const taxRoute = require("./Routes/Tax");
const orderRoute = require("./Routes/Order");
const priceRoute = require("./Routes/Pricing");
const invoiceRoute = require("./Routes/Invoice");
const offerRoute = require("./Routes/Offer");
const couponRoute = require("./Routes/Coupon");
const generalsettingRoute = require("./Routes/Generalsetting");
const custompriceRoute = require("./Routes/Custompricing");
const paymentsettingRoute = require("./Routes/Paymentsetting");
const itemsettingRoute = require("./Routes/Itemsetting");
const mailsettingRoute = require("./Routes/Mailsetting");
const ticketRoute = require("./Routes/Ticket");


const app = express();

app.use(cors());

app.use(express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// User Code
app.use("/api/user", userRoute);
app.use("/api/otp", otpRoute);
app.use("/api/usertype", usertypeRoute);
app.use("/api/category", categoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/item", itemRoute);
app.use("/api/tax", taxRoute);
app.use("/api/order", orderRoute);
app.use("/api/price", priceRoute);
app.use("/api/invoice", invoiceRoute);
app.use("/api/offer", offerRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/generalsetting", generalsettingRoute);

app.use("/api/customprice", custompriceRoute);
app.use("/api/paymentsetting", paymentsettingRoute);
app.use("/api/itemsetting", itemsettingRoute);
app.use("/api/mailsetting", mailsettingRoute);
app.use("/api/ticket", ticketRoute);


app.get("/", (req, res) => {
  res.status(200).send("<h1>HELLO API</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`Running on Port ${process.env.PORT}`);
});
