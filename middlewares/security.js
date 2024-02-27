const utilSecurity = require("../util/security");

module.exports = {
  checkJWT,
  checkLogin,
    checkIsAdmin,
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
  if (!req.user) return res.status(401).json("Unauthorized");
  next();
}

// to check if they are owner or if they are admin
function checkIsAdmin(req, res, next) {
  // Status code of 401 is Unauthorized
  if (!req.user) return res.status(401).json("Unauthorized");
  // check if email is the same as the logged in user and whether u are the admin
  // ie if you are not the owner and u are not the admin (ie,whether property for is_Admin
  // is true in dao for this user)
  if (req.body.email != req.user.email && req.user.is_admin == false)
    return res.status(401).json("Unauthorized");
  next();
}
