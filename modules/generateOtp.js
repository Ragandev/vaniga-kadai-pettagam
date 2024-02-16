const dbConnect = require("../config/db");
const OTP = require("../schema/Otp");
const otpGenerator = require("otp-generator");
dbConnect();
const generateOtp = async () => {
  //! Generate Otp
  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  //! Check if OTP is already present
  let result = await OTP.findOne({ otp: otp });
  if (result) {
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
  }
  return otp;
};

module.exports = generateOtp;
