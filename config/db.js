const mongoose = require("mongoose");

// connectDB().catch((err)=>{console.log(err.message)});

let connectDB = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecom_ssf");
};
module.exports = connectDB;
