const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const User = require("../models/User");

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create User
  const user = await User.create({ name, email, password, role });

  res.status(200).json({
    name,
    email,
    password,
    role,
  });
});

module.exports = { register };
