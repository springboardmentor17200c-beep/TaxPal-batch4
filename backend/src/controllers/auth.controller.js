const { successResponse } = require("../utils/response");
const { registerUser, loginUser } = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const result = await registerUser(req.body);
    successResponse(res, result, "User registered successfully", 201);
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);
    successResponse(res, result, "Login successful");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
