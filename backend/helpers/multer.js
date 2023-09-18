const multer = require("multer");
const path = require("path");

module.exports = {
  upload: multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, "./api/data/pictures");
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpeg|JPEG|jpg|JPG|png|PNG)$/)) {
        return cb(undefined, false);
      }
      -cb(undefined, true); // continue with upload
    },
  }),
};
