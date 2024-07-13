const multer = require("multer");

function createMulterInstance(uploadPath) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  return multer({ storage });
}

module.exports = createMulterInstance;
