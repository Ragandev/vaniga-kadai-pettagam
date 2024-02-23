const multer = require("multer");
const path = require("path");

// Function to create multer middleware with custom destination
function createMulterMiddleware(destinationPath) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destinationPath); // Custom destination directory
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        uniqueSuffix + "-" + file.originalname
      );
    },
  });

  return multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, 
  });
}

module.exports = createMulterMiddleware;
