var express = require("express");
var router = express.Router();
var userController = require("../controllers/users");
var securityMiddleware = require("../middlewares/security");

// @desc    user login
// @route   POST /user/signup
// @access  Public
router.post("/signup", userController.createUser);

// @desc    user login
// @route   GET /user/login
// @access  Public
router.get("/login", userController.getLoginDetails);

// @desc    user login
// @route   POST /user/login
// @access  Public
router.post("/login", userController.loginUser);

router.post(
  "/logout",
  securityMiddleware.checkLogin,
  userController.logoutUser
);

module.exports = router;
