const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse,
} = require("../controllers/courses");

router.route("/").get(getCourses).post(createCourse);
router.route("/:id").get(getCourse).delete(deleteCourse).put(updateCourse);

module.exports = router;
