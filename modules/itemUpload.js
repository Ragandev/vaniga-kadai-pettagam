const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "../vaniga-kadai/public/itemuploads/",
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        uniqueSuffix  + "-" + file.originalname
      );
    },
});

const itemupload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB (adjust the limit as needed)
})

module.exports = itemupload;