const userDao = require("../daos/users");
const utilSecurity = require("../util/security");

module.exports = {
  getUsers,
  createUser,
  getLoginDetails,
  loginUser,
  logoutUser,
  updateUser,
};

function getUsers(query) {
  return userDao.find(query);
}

// function getUsers(queryFields) {
//   return userDao.find(queryFields);
// }

async function createUser(body) {
  // check if email has been registered previously
  const user = await userDao.findOne({ email: body.email });
  if (user) {
    return { success: false, error: "User already exist" };
  }
  const newUser = await userDao.create(body);
  return { success: true, data: newUser };
}

async function updateUser(id, body) {
  const data = await userDao.findOneAndUpdate({ _id: id }, body, {
    new: true,
    // "true" returns the doc (ie, record) after update was applied.
    // else, it returns e original doc by default
  });
  return data;
}

async function getLoginDetails(queryFields) {
  const loginFields = {
    name: 1,
    salt: 1,
    iterations: 1,
  };
  if (!queryFields.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  // FE encodeURIComponent(email) because it contains special char. so we need to decode
  const userEmail = decodeURIComponent(queryFields.email);
  const loginFieldsRes = await userDao.findOne(
    { email: userEmail },
    loginFields
  );
  if (loginFieldsRes == null || Object.keys(loginFieldsRes).length == 0) {
    return { success: false, error: "Invalid email" };
  }
  return { success: true, data: loginFieldsRes };
}

async function loginUser(body) {
  if (!body.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  if (!body.hasOwnProperty("password")) {
    return { success: false, error: "missing password" };
  }

  const user = await userDao.findOne({
    email: body.email,
    password: body.password,
  });
  if (!user || user.length === 0) {
    return { success: false, error: "Invalid email/password" };
  }

  const jwtPayload = {
    user: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    name: user.name,
    id: user._id,
  };
  const token = utilSecurity.createJWT(jwtPayload);
  const expiry = utilSecurity.getExpiry(token);
  // userDao.updateOne({ email: body.email }, { token: token, expire_at: expiry });
  await userDao.findByIdAndUpdate(user._id, {
    token: token,
    expire_at: expiry,
  });
  return { success: true, data: token };
}

async function logoutUser(body) {
  if (!body.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  await userDao.updateOne(
    { email: body.email },
    { token: null, expire_at: null }
  );
  return { success: true };
}
