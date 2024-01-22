"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

const mailer = nodemailer.createTransport({
  name: process.env.MAILNAME,
  host: process.env.MAILHOST,
  port: process.env.MAILPORT,
  secure: process.env.SECURE,
  auth: {
    user: process.env.MAILUSER,
    pass: process.env.MAILPASS,
  },
});

mailer.verify((error, success) => {
  if (error) {
    console.error("Error connecting to the mailer:", error);
  } else {
    console.log("Mailer connection successful");
  }
});

module.exports = { mailer };
