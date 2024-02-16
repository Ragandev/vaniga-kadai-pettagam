const multer = require("multer");

const uploadFile = async () => {
  const upload = multer({
    dest: "../uploads",
    destination: 'uploads/',
    filename: (req, file, callBack) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callBack(null, file.fieldname + '-' + uniqueSuffix);
    }
  });
};
module.exports = uploadFile;
