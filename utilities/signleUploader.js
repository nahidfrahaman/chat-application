const createError = require("http-errors");
const multer = require("multer");
const path = require("path");

function uploader(subfolder, allow_file_types, max_file_size, error_msg) {
  const fileUploadsFoldr = `${__dirname}/../public/uploads/${subfolder}`;

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, fileUploadsFoldr);
    },
    filename: function (req, file, cb) {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });

  const upload = multer({
    storage,
    limits: {
      filesize: max_file_size,
    },
    fileFiler: (req, file, cb) => {
      if (allow_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });

  return upload;
}

module.exports = uploader;
