const express = require("express");
const route = express.Router();
const authController = require("../controllers/auth-controller");
const projectController = require("../controllers/project-controller");
const historyController = require("../controllers/history-controller");

route.post("/signup", authController.signup);
route.post("/login", authController.login);
//route.get("/test_token",authController.isLogged);

route.get("/projects", authController.isLogged, projectController.getAll);
route
  .route("/project/:id")
  .get(authController.isLogged, projectController.getOne)
  .post(authController.isLogged, projectController.create)
  .delete(authController.isLogged, projectController.delete);

route
  .route("/project/:id/invite")
  .get(authController.isLogged, projectController.generateInviteUrl)
  .post(authController.isLogged, projectController.join);

route
  .route("/project/:id/new")
  .post(
    authController.isLogged,
    historyController.create,
    historyController.uploadMultiFiles.array("files[]"),
    historyController.createEndPoint
  );

route
  .route("/history/:id")
  .get(authController.isLogged, historyController.getOne)
  .post(authController.isLogged, historyController.revire);

module.exports = route;
