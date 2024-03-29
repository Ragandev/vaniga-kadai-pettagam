const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, callBack) => {
    console.log(file)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callBack(null, uniqueSuffix + "-" + file.filename);
  },
});
const csvFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(new Error("Only CSV files are allowed!"), false);
  }
};
const upload = multer({ storage });

module.exports = upload;
