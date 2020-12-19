const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ");
  }

  // Get token from Cookies
  // if(req.cookie.token){
  //     token = req.cookie.token
  // }

  // check token is exits
  if (!token) {
    return next(
      new ErrorResponse("Not autherized to access this route hello"),
      401
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(
      new ErrorResponse("Not autherized to access this route hello-2"),
      401
    );
  }
});
