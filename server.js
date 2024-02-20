var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var recipesRouter = require("./routes/recipes");

require("dotenv").config();
var cors = require("cors");
require("./config/database");
var securityMiddleware = require("./middlewares/security");
var app = express();

//mount middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(securityMiddleware.checkJWT);

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/recipe", recipesRouter);

module.exports = app;
