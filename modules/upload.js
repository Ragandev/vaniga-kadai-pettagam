const multer = require("multer");

const storage = multer.diskStorage({
  dest: "../uploads",
  destination: "uploads/",
  filename: (req, file, callBack) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callBack(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const csvFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(new Error("Only CSV files are allowed!"), false);
  }
};
const upload = multer({ storage, fileFilter: csvFilter });

module.exports = upload;
