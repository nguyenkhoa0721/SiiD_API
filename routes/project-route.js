const express = require("express");
const route = express.Router();
const authController = require("../controllers/auth-controller");
const projectController = require("../controllers/project-controller");
const historyController = require("../controllers/history-controller");

route
  .route("/")
  .get(authController.isLogged, projectController.getAll)
  .post(authController.isLogged, projectController.create);

route
  .route("/:id")
  .get(authController.isLogged, projectController.getOne)
  .post(
    authController.isLogged,
    historyController.create,
    historyController.uploadMultiFiles.array("files[]"),
    historyController.createEndPoint
  )
  .delete(authController.isLogged, projectController.delete);

route
  .route("/:id/invite")
  .get(authController.isLogged, projectController.generateInviteUrl)
  .post(authController.isLogged, projectController.join);

module.exports = route;
