const recipeModel = require("../models/recipes");
// const noteModel = require("../models/notes");
// const { sendEmail } = require("../util/sendEmail");
// const dateTimeHandler = require("../util/datetime");

module.exports = {
  getAllRecipes,
  getAllByUser,
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
    const data = await recipeModel.getAllByUserId(user);
    if (!data || data == "null") {
      return res.json("user has not created any recipes");
    } else {
      res.json(data);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

/*
// Get all recipes based on filter criteria
async function getAllByFilter(req, res) {
// Check if the user has a restaurant
  return daoRecipe.find(query);

  const recipes = await recipeModel.filterAllByRestaurantId({
    startDateTime: req.query.startDateTime,
    endDateTime: req.query.endDateTime,
    id: restaurant._id,
  });
  res.json(recipes);
}
*/

// Get one recipe by ID
async function getOneById(req, res) {
  //check user's identity
  const user = req.user.id;
  // if guest user (ie, no account), pull recipes without notes
  if (!user || user === null) {
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
  } else {
    try {
      // pull recipe with notes created by user
      const data = await recipeModel.getOneByIdWithNotes(req.params.recpId);
      if (!data || data == "null") {
        res.json("this recipe does not exist");
      } else {
        res.json(data);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ errorMsg: err.message });
    }
  }
}

// Create a recipe
async function createRecipe(req, res) {
  try {
    data = await recipeModel.createRecipe(
      req.body
      // {...req.body,
      // user,}
    );
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
