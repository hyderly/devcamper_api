const express = require("express");
const router = express.Router({ mergeParams: true });

const Course = require("../models/Course");
const advancedResults = require("../middlewares/advancedResults");

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
  .post(createCourse);
router.route("/:id").get(getCourse).delete(deleteCourse).put(updateCourse);

module.exports = router;
