var express = require("express");
var router = express.Router();
var recipeController = require("../controllers/recipes");
// var securityMiddleware = require("../middlewares/security");

// @desc    Get all recipes
// @route   GET /recipe/
// @access  Private (bearer token passed in header)
router.get(
  "/",
  //   securityMiddleware.checkLogin,
  recipeController.getAllRecipes
);

// @desc    Get all recipes created by user
// @route   GET /recipe/userID
// @access  Private (bearer token passed in header)
router.get(
  "/",
  //   securityMiddleware.checkLogin,
  recipeController.getAllByUserId
);

/*
// @desc    Get all recipes (by filter)
// @route   GET /recipe/?[filter params]
// @access  Private (bearer token passed in header/ check if user is an owner of restaurant)
router.get(
  "/recipe",
  //   securityMiddleware.checkIfOwner,
  recipeController.getAllByFilter
);
*/

// @desc    Create a recipe
// @route   POST /recipe/create
// @access  Private (bearer token passed in header)
router.post(
  "/create",
  // securityMiddleware.checkLogin,
  recipeController.createRecipe
);

// @desc    Get one recipe by recipe ID
// @route   GET /recipe/:id
// @access  Public
router.get("/:id", recipeController.getOneById);

// @desc    Update a recipe
// @route   POST /recipe/:id
// @access  Private (bearer token passed in header)
router.post("/:id", recipeController.updateRecipe);

// @desc    Delete a recipe
// @route   DELETE /recipe/:id
// @access  Private (bearer token passed in header)
router.delete(
  "/:id",
  // securityMiddleware.checkLogin,
  recipeController.deleteRecipe
);

module.exports = router;
