const mongoose = require("mongoose");
const mail = require("../modules/mailsender");
require("dotenv").config();

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdat: {
    type: Date,
    default: Date.now,
    expires: 1 * 60,
  },
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mail(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
         <p>Here is your OTP code: <b>${otp}</b></p>`
    );
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error occurred while sending email");
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("otp", otpSchema);
