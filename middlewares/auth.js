const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");


// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Get token from Cookies
  // if(req.cookie.token){
  //     token = req.cookie.token
  // }

  // check token is exits
  if (!token) {
    return next(
      new ErrorResponse("Not autherized to access this route"),
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
      new ErrorResponse("Not autherized to access this route"),
      401
    );
  }
});


// Grant access to specific user
exports.autherize = (...roles) => {
  return  (req, res, next) => {
    if(!roles.includes(req.user.role)){
      return next(new ErrorResponse(`User with role ${req.user.role} is not autherized to acces this route`));
    }
    next();
  }
}
