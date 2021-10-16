const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const xss = require("xss-clean");

const app = express();

//app use
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

//routes
const userRoute = require("./routes/user-route");
app.use("/api/v1/user/", userRoute);

module.exports = app;
