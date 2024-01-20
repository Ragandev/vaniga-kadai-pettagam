const { mailer, isMailerConnected } = require("../config/mailer");
require("dotenv").config();

console.log(process.env.MAILFROM)

const mail = async (toAddress, subject, html) => {
  
    const info = await mailer.sendMail({
      from: process.env.MAILFROM,
      to: toAddress,
      subject: subject,
      html: html,
    });
    console.log("Message sent: %s", info.messageId);
    console.log(info.accepted);
    console.log(info.rejected);

};

module.exports = mail;
