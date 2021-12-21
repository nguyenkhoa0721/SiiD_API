const Project = require("../models/projects");
const History = require("../models/history");
const Payment = require("../models/history");
const sendRes = require("../utils/send-res");
const shortid = require("shortid");

exports.getAll = async (req, res) => {
  const projects = await Project.find({
    $or: [
      { designers: { $elemMatch: { $eq: req.user } } },
      { clients: { $elemMatch: { $eq: req.user } } },
    ],
  });
  return sendRes.resSuccess(res, projects);
};

exports.getOne = async (req, res) => {
  let project = await Project.findOne({
    _id: req.params.id,
  }).populate("histories");
  if (!project) {
    return sendRes.resError(res, "Không tìm thấy", 404);
  }
  if (!clients.includes(req.user) && !designers.includes(req.user)) {
    return sendRes.resError(res, "Không được phép", 406);
  }
  project = await project.toJSON();
  project.current = await History.findById(project.histories[project.histories.length - 1]).sort({
    createdAt: -1,
  });
  return sendRes.resSuccess(res, project);
};

exports.create = async (req, res) => {
  const payment = await Payment.create({ budget: req.body.budget });

  let project = new Project({ payment });

  project.owner = req.user;
  project.clients.add(req.user);
  project.projectName = req.body.projectName;
  project.state = "pending";

  const savedProject = await project.save();
  if (savedProject) {
    return sendRes.resSuccess(res, savedProject);
  }
};

exports.generateInviteUrl = async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    owner: req.user,
  });

  if (!project) {
    return sendRes.resError(res, "Không tìm thấy", 404);
  }

  project.inviteClient = shortid.generate();
  project.inviteDesign = shortid.generate();

  await project.save();
  sendRes.resSuccess(res, {
    client: project.inviteClient,
    design: project.inviteDesign,
  });
};

exports.join = async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
  });

  if (!project) {
    return sendRes.resError(res, "Không tìm thấy", 404);
  }

  if (clients.includes(req.user) || designers.includes(req.user))
    return sendRes.resSuccess(res, {});

  if (project.inviteClient == req.query.password) {
    project.clients.add(req.user);
    await project.save();
    return sendRes.resSuccess(res, {});
  } else if (project.inviteDesign == req.query.password) {
    project.designers.add(req.user);
    await project.save();
    return sendRes.resSuccess(res, {});
  } else {
    await project.save();
    return sendRes.resError(res, "Key không hợp lệ", 406);
  }
};

exports.delete = async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    owner: req.user,
  });

  await project.delete();
  return sendRes.resSuccess(res, {});
};
