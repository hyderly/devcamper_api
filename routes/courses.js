const express = require("express");
const router = express.Router({ mergeParams: true });

const Course = require("../models/Course");
const advancedResults = require("../middlewares/advancedResults");

// Auth Middleware
const {protect} = require("../middlewares/auth");

const {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse,
} = require("../controllers/courses");

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description careers",
    }),
    getCourses
  )
  .post(protect, createCourse);

router
  .route("/:id")
  .get(getCourse)
  .delete(protect, deleteCourse)
  .put(protect, updateCourse);

module.exports = router;
