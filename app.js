const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const xss = require("xss-clean");
const cors = require("cors");
const app = express();
require("dotenv").config();

const whitelist = process.env.ACCESS_CONTROL_ALLOW_ORIGIN.split(",");
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) callback(null, true);
    else if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
};

//app use
app.use(cors(corsOptions));
app.use('/static',express.static('public'));
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

//routes
const userRoute = require("./routes/user-route");
const profileRoute = require("./routes/profile-route");
const portfolioRoute = require("./routes/portfolio-route");
const commentRoute = require ("./routes/comment-route.js");
const projectRoute = require("./routes/project-route");
const historyRoute = require("./routes/history-route");
app.use("/api/v1/user/", userRoute);
app.use("/api/v1/project/", projectRoute);
app.use("/api/v1/history/", historyRoute);

app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/portfolio",portfolioRoute);
app.use("/api/v1/comment", commentRoute);
module.exports = app;
