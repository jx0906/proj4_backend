const utilSecurity = require("../util/security");
const recipeModel = require("../models/recipes");

module.exports = {
  checkJWT,
  checkLogin,
  // checkUserRole,
};

function checkJWT(req, res, next) {
  // Check for the token being sent in header or as a query parameter
  let token = req.get("Authorization") || req.query.token;
  if (token && token.startsWith("Bearer ")) {
    token = token.replace("Bearer ", "");
    try {
      const jwt = utilSecurity.verifyJWT(token);
      req.user = jwt.payload;
    } catch (err) {
      console.log(err);
      req.user = null;
    }
  }
  next();
}

function checkLogin(req, res, next) {
  // check whether user exists
  if (!req.user) return res.status(401).json("Unauthorized - not logged in");
  next();
}

// // to check if they are admin
// async function checkUserRole(req, res, next) {
//   const currRecipe = await recipeModel.getOneById(req.params.id);
//   if (currRecipe.user !== user || !req.user.isAdmin)
//   // Status code of 401 is Unauthorized
//   return res.status(401).json("Unauthorized");
//   next();
// }
