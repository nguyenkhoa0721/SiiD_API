const multer = require("multer");
const slugify = require("slugify");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, req.dirname1);
  },
  filename: function (req, file, cb) {
    let tmp = slugify(file.originalname);
    cb(null, Date.now() + "-" + tmp);
  },
});
let psd = ["application/x-photoshop", "application/octet-stream", "image/vnd.adobe.photoshop"];
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    psd.include(file.minetype)
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
exports.upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
