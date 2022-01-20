const multer = require('multer');

const storage =  multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, req.dirname1);
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
};
exports.upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
