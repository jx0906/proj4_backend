const recipeDao = require("../daos/recipes");

module.exports = {
  getAllRecipes,
  getAllByUser,
  getByKeyword,
  getAllByFilter,
  getOneById,
  getOneByIdWithNotes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};

function getAllRecipes(query) {
  return recipeDao.find(query);
}

async function getAllByUser(id) {
  const data = await recipeDao.find({ user: id });
  return data;
}

async function getByKeyword(searchTerm) {
  // use regex to match the search term against intended database fields.
  const searchTermRegex = new RegExp(searchTerm, "i"); // 'i' for case-insensitive search

  const data = await recipeDao.find({
    $or: [
      { name: { $regex: searchTermRegex } }, // 'i' flag for case-insensitive search
      { description: { $regex: searchTermRegex } },
      { "ingredients.name": { $regex: searchTermRegex } },
      { instructions: { $regex: searchTermRegex } },
    ],
  });
  // .sort({ name: 1 }); // ascending order

  return data;
}

async function getAllByFilter(query) {
  // variable according to filter options in home page
  var findQuery = {};
  var queryFields = [
    "level of difficulty",
    "category",
    "time required",
    "created by user",
  ];

  for (field of queryFields) {
    console.log(field);
    if (query.hasOwnProperty(field)) {
      findQuery[field] = query[field];
    }
  }

  // list ingredient separately as a query param to cater for myButler feature
  var ingredients = [];
  if (query.hasOwnProperty("ingredients")) {
    ingredients = query["ingredients"].split(",");
  }
  console.log(ingredients);

  var data;
  if (ingredients.length > 0) {
    data = await recipeDao.find(findQuery).where("ingredient").in(ingredients);
  } else console.log(findQuery);
  data = await recipeDao.find(findQuery);
  return data;
}

// async function getOneById(param) {
//   const data = await recipeDao.findOne({ _id: param });
//   return data;
// }

async function getOneById(param) {
  const data = await recipeDao.findById(param);
  return data;
}

function getOneByIdWithNotes(id) {
  return recipeDao.findById(id).populate("notes");
}

function createRecipe(body) {
  /* If you're sending the image as Base64-encoded data within the request body, you'll
  need to decode it before storing it in the database, ie: */
  // const imageData = Buffer.from(body.image.img.data, "base64");
  // body.image.img.data = imageData;
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
