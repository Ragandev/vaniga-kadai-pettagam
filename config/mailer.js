"use strict";
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
require("dotenv").config();

const mailer = nodemailer.createTransport(
  smtpTransport({
    name: process.env.MAILNAME,
    host: process.env.MAILHOST,
    port: process.env.MAILPORT,
    secure: process.env.SECURE,
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASS,
    },
  })
);

mailer.verify((error, success) => {
  if (error) {
    console.error("Error connecting to the mailer:", error);
  } else {
    console.log("Mailer connection successful");
  }
});

// let isTransporterIdle = false;

// // Listen for the 'sent' event
// mailer.on("sent", (info) => {
//   console.log("Email sent:", info);
// });

// // Set a timer to check for idle state every 10 seconds (adjust as needed)
// setInterval(() => {
//   if (!isTransporterIdle) {
//     console.log("Transporter is not actively processing tasks.");
//     isTransporterIdle = true;
//   }
// }, 10000);

module.exports = { mailer };
