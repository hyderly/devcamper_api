const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

// @des:   Get Courses
// @route: GET /api/v1/courses
// @route: GET /api/v1/bootcamps/:bootcampId/coruses
// @access: Public

const getCourses = asyncHandler(async (req, res, next) => {
  let query;

  // GET /api/v1/bootcamps/:bootcampId/coruses
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId }).populate({
      path: "bootcamp",
      select: "name description careers",
    });
    //GET /api/v1/courses
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description careers",
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @des:   Get Single Course
// @route: GET /api/v1/courses/:id
// @access: Public

const getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description careers",
  });

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @des:   Create Bootcamp
// @route: POST /api/v1/bootcamps/:bootcampId/courses
// @access: Private
const createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.bootcampId}`)
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @des:   Update Course
// @route: POST /api/v1/courses/:id
// @access: Private
const updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse(`Course not found with id ${req.params.id}`));
  }

  course = await Course.update(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @des:   Delete Course
// @route: DELETE /api/v1/courses/:id
// @access: Private
const deleteCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse(`Course not found with id ${req.params.id}`));
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse,
};
