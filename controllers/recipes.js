const recipeModel = require("../models/recipes");
// const imageModel = require("../models/images");
// const noteModel = require("../models/notes");
// const { sendEmail } = require("../util/sendEmail");
// const dateTimeHandler = require("../util/datetime");
// const Grid = require("gridfs-stream");
// const { createReadStream } = require("fs");

module.exports = {
  getAllRecipes,
  getAllByUser,
  getByKeyword,
  // getAllByFilter,
  getOneById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};

async function getAllRecipes(req, res) {
  try {
    const data = await recipeModel.getAllRecipes();
    res.json({ recipes: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

// Get all recipes created by user
async function getAllByUser(req, res) {
  try {
    // check if user has self-created recipes, ie if the user who made the
    // recipe matches the token user
    const user = req.user.id;
    const data = await recipeModel.getAllByUser(user);
    if (!data || data == "null") {
      return res.json("user has not created any recipes");
    } else {
      res.json({ recipes: data });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

// Get recipes based on keywords
async function getByKeyword(req, res) {
  try {
    // const searchTerm = req.query.searchTerm; // Access the searchTerm from req
    const data = await recipeModel.getByKeyword(req.query.searchTerm);
    res.json({ recipes: data });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Get recipes based on filter criteria
// async function getAllByFilter(req, res) {
//   const recipes = await recipeModel.getAllByFilter(req.query);
//   res.json(recipes);
// }

// Get one recipe by ID
async function getOneById(req, res) {
  //check user's identity
  // const user = req.user.id;
  // if guest user (ie, no account), pull recipes without notes
  // if (!user) {
  try {
    const data = await recipeModel.getOneById(req.params.recpId);
    if (!data || data == "null") {
      res.json("this recipe does not exist");
    } else {
      res.json(data);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: err.message });
  }
  // } else {
  //   try {
  //     // pull recipe with notes created by user
  //     const data = await recipeModel.getOneByIdWithNotes(req.params.recpId);
  //     if (!data || data == "null") {
  //       res.json("this recipe does not exist");
  //     } else {
  //       res.json(data);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ errorMsg: err.message });
  //   }
  // }
}

// Create a recipe
async function createRecipe(req, res) {
  try {
    // if (req.file) {
    //   // Handle the uploaded file, such as storing it in MongoDB or AWS S3
    //   const image = req.file; // Access uploaded image from Multer
    // }
    // const {
    //   name,
    //   category,
    //   levelOfDiff,
    //   timeRequired,
    //   servings,
    //   ingredients,
    //   instructions,
    //   description,
    //   image,
    // } = req.body;
    const data = await recipeModel.createRecipe({
      ...req.body,
      user: req.user.id,
    });
    res.json(data);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function updateRecipe(req, res) {
  // Check if the user who made the recipe matches the token user
  try {
    // insert validation checks?
    const updatedRecipe = await recipeModel.updateRecipe(
      req.params.recpId,
      req.body
    );
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

// Delete a recipe by ID
async function deleteRecipe(req, res) {
  try {
    await recipeModel.deleteRecipe(req.params.recpId);
    res.status(200).json("recipe deleted");
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

/*WITH USER INFO
// Update a recipe by ID
async function updateRecipe(req, res) {
  // Check if the user who made the recipe matches the token user
  const curRecipe = await recipeModel.getOneById(req.params.recpId);
  if (!curRecipe.user || curRecipe.user != user) {
    return res.status(401).json("Unauthorized");
  } else {
    try {
      // insert validation checks?
      const updatedRecipe = await recipeModel.updateRecipe(
        req.params.recpId,
        req.body
      );
      res.status(200).json(updatedRecipe);
    } catch (err) {
      res.status(500).json({ errorMsg: err.message });
    }
  }
}


// Delete a recipe by ID
async function deleteRecipe(req, res) {
  // Check if the user who made the recipe matches the token user
  const user = req.user.id;
  const data = await recipeModel.getOneById(req.params.recpId);
  if (!data.user || data.user != user) {
    return res.status(401).json("Unauthorized");
  } else {
    try {
      await recipeModel.deleteRecipe(req.params.recpId);
      res.status(200).json("recipe deleted");
    } catch (err) {
      res.status(500).json({ errorMsg: err.message });
    }
  }
}
*/
