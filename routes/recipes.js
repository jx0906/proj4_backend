var express = require("express");
var router = express.Router();
var recipeController = require("../controllers/recipes");
var securityMiddleware = require("../middlewares/security");
var multer = require("multer");
var upload = multer(); // Create a Multer instance for handling file uploads

// @desc    Get all recipes
// @route   GET /recipe/
// @access  Public (bearer token passed in header)
router.get(
  "/",
  // securityMiddleware.checkLogin,
  recipeController.getAllRecipes
);

// @desc    Get all recipes created by user
// @route   GET /recipe/user/
// @access  Private (bearer token passed in header)
router.get(
  "/user",
  securityMiddleware.checkLogin,
  recipeController.getAllByUser
);

// @desc    Get all recipes (by keyword)
// @route   GET recipe/search?searchTerm=banana
// @access  Public
router.get(
  // : indicates route parameters for an ID, not a query parameter for a search term.
  // using "?searchTerm=:keyword" makes searchTerm a query parameter and accessible via req.query.searchTerm - to include "" portion in URL for FE API call
  "/search",
  //   securityMiddleware.checkIfOwner
  recipeController.getByKeyword
);

// @desc    Get recipes (by edamam id)
// @route   GET recipe/find?edamamId=xxxxx
// @access  Private
router.get(
  "/find",
  securityMiddleware.checkLogin, // user info is passed in to userActions.jsx so no need to get user identity from jwt like updateRecipe below
  recipeController.getBySpecificField
);

// @desc    Create a recipe
// @route   POST /recipe/create
// @access  Private (bearer token passed in header)
router.post(
  "/create",
  securityMiddleware.checkLogin,
  // upload.single("image"), // call middleware to handle single file upload with the field name "image" in req.file; Multer will process the uploaded file and store it in memory.
  recipeController.createRecipe
);

// @desc    Get one recipe by recipe ID
// @route   GET /recipe/:id
// @access  Public
// router.get("/:recpId", recipeController.getOneById);

// @desc    Update a recipe
// @route   POST /recipe/:id/edit
// @access  Private (bearer token passed in header); admin and recipe creator only
router.post(
  "/:recpId/edit",
  securityMiddleware.checkLogin,
  securityMiddleware.checkJWT, // to verify when i have time if this is necessary cos i didnt pass user info to edit function in FE for CRUD op
  recipeController.updateRecipe
);

// @desc    Add users who bookmark a recipe - separating this from edit because the permissions are less stringent, ie any user can update the "bookmarked" field
// @route   POST /recipe/:id/addbookmark
// @access  Private (bearer token passed in header); users only
router.post(
  "/:recpId/addbookmark",
  securityMiddleware.checkLogin,
  recipeController.addBookmark
);

// @desc    Delete a recipe
// @route   DELETE /recipe/:id
// @access  Private (bearer token passed in header); admin only
router.delete(
  "/:recpId",
  securityMiddleware.checkLogin,
  securityMiddleware.checkJWT,
  recipeController.deleteRecipe
);

module.exports = router;
