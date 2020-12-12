const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Course = require("../models/Course");

// @des:   Get all bootcamps
// @route: GET /api/v1/courses
// @route: GET /api/v1/bootcamps/:bootcampId/courses
// @access: Public
const getCourses = async (req, res, next) => {
  let query;

  if (req.query.bootcampId) {
    query = Course.find({ bootcamp: req.query.bootcampId });
  } else {
    query = Course.find();
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
};
