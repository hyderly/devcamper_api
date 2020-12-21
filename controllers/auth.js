const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const User = require("../models/User");

// @des:   POST Register User
// @route: POST /api/v1/auth/register
// @access: Public
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });

  sendTokenResponse(user, 200, res);
});

// @des:   POST Login User
// @route: POST /api/v1/auth/login
// @access: Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide and email and password", 400)
    );
  }

  // Check user by email
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Wrong email or password"));
  }

  // Check password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Wrong email or password"));
  }

  sendTokenResponse(user, 200, res);
});

// Get token and response, Create cookie and sent it.
const sendTokenResponse = function (user, statusCode, res) {
  // Create Token
  const token = user.getJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXP * 30 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options) // key - value - options
    .json({
      success: true,
      token,
    });
};

// @des:   GET logged in user
// @route: POST /api/v1/auth/me
// @access: Private
const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.send({
    success: true,
    data: user,
  });
});

module.exports = { register, login, getMe };
