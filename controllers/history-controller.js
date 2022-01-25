const History = require("../models/history");
const Project = require("../models/project");
const sendRes = require("../utils/send-res");
const File = require("../models/file");
const Design = require("../models/design");
const path = require("path");
var PSD = require("psd");
const fs = require("fs-extra");
const multer = require("multer");
const shortid = require("shortid");

const generateFileName = (file) => {
  return (
    path.parse(file.originalname).name + "-" + shortid.generate() + path.extname(file.originalname)
  );
};

exports.getOne = async (req, res) => {
  let history = await History.findOne({
    _id: req.params.id,
  }).populate("designs");
  if (!history) {
    return sendRes.resError(res, "Không tìm thấy", 404);
  }

  let project = await Project.findOne({
    _id: history.project,
    $or: [
      { designers: { $elemMatch: { $eq: req.user } } },
      { clients: { $elemMatch: { $eq: req.user } } },
    ],
  });

  if (!project) {
    return sendRes.resError(res, "Không tìm thấy", 404);
  }
  return sendRes.resSuccess(res, history);
};

exports.revire = async (req, res) => {
  let history = await History.findOne({
    _id: req.params.id,
  }).populate("designs");
  let project = await Project.findOne({
    _id: history.project,
    $or: [
      { designers: { $elemMatch: { $eq: req.user } } },
      { clients: { $elemMatch: { $eq: req.user } } },
    ],
  });
  if (!history) {
    return sendRes.resError(res, "Không tìm thấy", 404);
  }
  if (!project) {
    return sendRes.resError(res, "Không tìm thấy", 404);
  }

  let designs = [];
  for (let i in history.designs) {
    let designFile = history.designs[i].designFile;
    let imageFile = history.designs[i].imageFile;
    let originName = history.designs[i].originName;

    let design = await Design.create({ designFile, imageFile, originName });
    designs.push(design._id);
  }

  const savedHistory = await History.create({
    project: history.project,
    createdBy: req.user,
    designs,
    changeNote: `Revire from ${history._id}`,
  });

  return sendRes.resSuccess(res, savedHistory);
};

exports.uploadMultiFiles = multer({
  limits: { fileSize: 20 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, req.dirname);
    },
    filename: async function (req, file, cb) {
      cb(null, generateFileName(file));
    },
  }),
});

exports.create = async (req, res, next) => {
  req.project = await Project.findOne({
    _id: req.params.id,
    designers: { $elemMatch: { $eq: req.user } },
  });

  if (!req.project) {
    return sendRes.resError(res, "Không tìm thấy", 404);
  }

  req.oldHistory = await History.findOne({
    project: req.params.id,
  })
    .sort({ createdAt: -1 })
    .populate("designs");

  req.history = await History.create({});
  req.dirname = `public/project/${req.params.id}/history/${req.history.id}`;
  fs.mkdirsSync(req.dirname);
  return next();
};

exports.createEndPoint = async (req, res) => {
  let thumbnail = "";
  req.history.project = req.project._id;
  if (req.files.length) {
    let arr = [];
    for (let i in req.files) {
      let designFile = null;
      let imageFile = null;
      if (path.extname(req.files[i].path) == ".psd") {
        const psd = await PSD.open(req.files[i].path);
        psd.image.saveAsPng(req.files[i].path.split(".")[0] + ".png");
        designFile = await File.create({
          path: req.files[i],
          createdBy: req.user,
        });
        imageFile = await File.create({
          path: req.files[i].path.split(".")[0] + ".png",
          createdBy: req.user,
        });
      } else {
        imageFile = await File.create({
          path: req.files[i].path,
          createdBy: req.user,
        });
      }
      if (!thumbnail) thumbnail = req.files[i].path;
      let basename = path.parse(req.files[i].path.split(".")[0]).base;
      let originName = basename.split("-")[0];

      let design = await Design.create({ designFile, imageFile, originName });
      arr.push(originName);
      req.history.designs.push(design._id);
    }
    if (req.body.deleteFiles) arr = arr + json.prase(req.body.deleteFiles);

    if (req.oldHistory)
      for (let i in req.oldHistory.designs) {
        if (arr.includes(req.oldHistory.designs[i].originName)) {
        } else {
          let designFile = req.oldHistory.designs[i].designFile;
          let imageFile = req.oldHistory.designs[i].imageFile;
          let originName = req.oldHistory.designs[i].originName;

          let design = await Design.create({ designFile, imageFile, originName });
          req.history.designs.push(design._id);
        }
      }

    req.history.changeNote = req.body.changeNote;
    req.history.createdBy = req.user;

    req.history = await req.history.save();

    req.project.thumbnail = thumbnail;
    await req.project.save();
    return sendRes.resSuccess(res, req.history);
  }
};
