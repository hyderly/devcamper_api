// Import external modules
const express = require("express");
const router = express.Router();

// Import Route methods
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  uploadBootcampPhoto
} = require("../controllers/bootcamps");

// Include other resource router
const courseRoutes = require("./courses");

// Re-route into other resource route
router.use("/:bootcampId/courses", courseRoutes);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/").get(getBootcamps).post(createBootcamp);

router.route("/:id/photo").put(uploadBootcampPhoto);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
