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
  uploadBootcampPhoto,
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");

// Import advanced results middleware
const advancedResults = require("../middlewares/advancedResults");

// Auth Middleware
const { protect, autherize } = require("../middlewares/auth");

// Include other resource router
const courseRoutes = require("./courses");

// Re-route into other resource route
router.use("/:bootcampId/courses", courseRoutes);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, autherize("publisher", "admin"), createBootcamp);

router
  .route("/:id/photo")
  .put(protect, autherize("publisher", "admin"), uploadBootcampPhoto);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, autherize("publisher", "admin"), updateBootcamp)
  .delete(protect, autherize("publisher", "admin"), deleteBootcamp);

module.exports = router;
