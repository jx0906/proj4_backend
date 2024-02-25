var express = require("express");
var multer = require("multer");
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

//initialise Express app
var app = express();

// Configure Multer storage for handling file uploads and direct storage in MongoDB
var storage = multer.memoryStorage(); // Store images in memory for now
var upload = multer({ storage });

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
// Apply middleware to recipe route
// app.use("/recipe", upload.single("image"), recipesRouter);

module.exports = app;
