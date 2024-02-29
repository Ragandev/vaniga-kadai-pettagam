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
const adminUserRoute = require("./Routes/AdminUser");
const bannerRoute = require("./Routes/Banner");
const shopbycat1Route = require("./Routes/Shopbycategory1");
const shopbycat2Route = require("./Routes/Shopbycategory2");
const shopbycat3Route = require("./Routes/Shopbycategory3");
const offerbanner = require("./Routes/Offerbanner");
const quotationRoute = require("./Routes/Quotation");
const purchaseRoute = require("./Routes/purchase");
const invoiceSettingRoute = require("./Routes/InvoiceSettings");



const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('Documents'));

// User Code
app.use("/api/user", userRoute);
app.use("/api/adminuser", adminUserRoute);
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
app.use("/api/banner", bannerRoute);
app.use("/api/shopcat1", shopbycat1Route);
app.use("/api/shopcat2", shopbycat2Route);
app.use("/api/shopcat3", shopbycat3Route);
app.use("/api/offerbanner", offerbanner);
app.use("/api/quotation", quotationRoute);
app.use("/api/purchase", purchaseRoute);
app.use("/api/invoicesettings", invoiceSettingRoute);


app.get("/", (req, res) => {
  res.status(200).send("<h1>HELLO API</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`Running on Port ${process.env.PORT}`);
});
