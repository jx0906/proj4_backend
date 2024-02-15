const recipeDao = require("../daos/recipes");

module.exports = {
  getAllRecipes,
  getAllByUserId,
  // getAllByFilter,
  getOneById,
  getOneByIdWithNotes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};

function getAllRecipes(query) {
  return recipeDao.find(query);
}

async function getAllByUserId(id) {
  const data = await recipeDao.find({ user: id });
  return data;
}

/*
async function getAllByFilter(query) {
  // variable for querying specific fields in database
  var findQuery = {};
  var queryFields = ["level of difficulty", "category", "time required"];
  return recipeDao
    .find({
      levelOfDiff: queryFields.dateTime: {
        $gte: new Date(startDateTime),
        $lte: new Date(endDateTime),
      },
    })
    .sort({ dateTime: 1 })
    // use populate so we immediately get relevant data from the referenced data table
    .populate(
    
    );
}
*/

async function getOneById(param) {
  const data = await recipeDao.findById(param);
  // One({ _id: param });
  return data;
}

function getOneByIdWithNotes(id) {
  return recipeDao.findById(id).populate("notes");
}

function createRecipe(body) {
  return recipeDao.create(body);
}

async function updateRecipe(id, body) {
  const data = await recipeDao.findOneAndUpdate({ _id: id }, body, {
    new: true,
    // "true" returns the doc (ie, record) after update was applied.
    // else, it returns e original doc by default
  });
  return data;
}

function deleteRecipe(id) {
  return recipeDao.findByIdAndDelete(id);
}
