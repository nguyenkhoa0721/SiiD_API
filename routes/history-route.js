const express = require("express");
const route = express.Router();
const authController = require("../controllers/auth-controller");
const historyController = require("../controllers/history-controller");

route
  .route("/:id")
  .get(authController.isLogged, historyController.getOne)
  .post(authController.isLogged, historyController.revire);

module.exports = route;
