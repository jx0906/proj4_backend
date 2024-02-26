const userModel = require("../models/users");

module.exports = {
  getUsers,
  createUser,
  getLoginDetails,
  loginUser,
  logoutUser,
  updateUser,
};

async function getUsers(req, res) {
  try {
    const userData = await userModel.getUsers(req.query);
    res.json({ users: userData });
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function createUser(req, res) {
  try {
    const userData = await userModel.createUser(req.body);
    console.log(userData);
    if (!userData.success) {
      res.status(400).json({ errorMsg: userData.error });
      return;
    }
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function updateUser(req, res) {
  // Check if the user who made the recipe matches the token user
  try {
    const updatedUser = await userModel.updateUser(req.params.userId, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getLoginDetails(req, res) {
  try {
    const loginDetails = await userModel.getLoginDetails(req.query);
    if (loginDetails.success != true) {
      res.status(400).json({ errorMsg: loginDetails.error });
      return;
    }
    res.json(loginDetails.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const token = await userModel.loginUser(req.body);
    console.log(token);
    if (!token.success) {
      res.status(400).json({ errorMsg: token.error });
      return;
    }
    res.json(token.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function logoutUser(req, res) {
  try {
    const result = await userModel.logoutUser(req.body);
    if (!result.success) {
      res.status(400).json({ errorMsg: result.error });
      return;
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}
