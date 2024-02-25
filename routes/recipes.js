var express = require("express");
var router = express.Router();
var recipeController = require("../controllers/recipes");
// var securityMiddleware = require("../middlewares/security");
var multer = require("multer");
var upload = multer(); // Create a Multer instance for handling file uploads

// @desc    Get all recipes
// @route   GET /recipe/
// @access  Private (bearer token passed in header)
router.get(
  "/",
  //   securityMiddleware.checkLogin,
  recipeController.getAllRecipes
);

// @desc    Get all recipes created by user
// @route   GET /recipe/user/
// @access  Private (bearer token passed in header)
router.get(
  "/user",
  //   securityMiddleware.checkLogin,
  recipeController.getAllByUser
);

// @desc    Get all recipes (by filter)
// @route   GET /recipe?[filter params]
// @access  Private (bearer token passed in header/ check if user is an owner of restaurant)
router.get(
  "/recipe",
  //   securityMiddleware.checkIfOwner,
  recipeController.getAllByFilter
);

// @desc    Create a recipe
// @route   POST /recipe/create
// @access  Private (bearer token passed in header)
router.post(
  "/create",
  // securityMiddleware.checkLogin,
  upload.single("image"), // call middleware to handle single file upload with the field name "image" in req.file; Multer will process the uploaded file and store it in memory.
  recipeController.createRecipe
);

// @desc    Get one recipe by recipe ID
// @route   GET /recipe/:id
// @access  Public
router.get("/:recpId", recipeController.getOneById);

// @desc    Update a recipe
// @route   POST /recipe/:id/edit
// @access  Private (bearer token passed in header)
router.post("/:recpId/edit", recipeController.updateRecipe);

// @desc    Delete a recipe
// @route   DELETE /recipe/:id
// @access  Private (bearer token passed in header)
router.delete(
  "/:recpId",
  // securityMiddleware.checkLogin,
  recipeController.deleteRecipe
);

module.exports = router;
