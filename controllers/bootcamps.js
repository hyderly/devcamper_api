const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Bootcamp = require("../models/Bootcamp");
const geocoder = require("../utils/geocoder");

// @des:   Get all bootcamps
// @route: GET /api/v1/bootcamps
// @access: Public
const getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res
    .status("200")
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @des:   Get specific bootcamp
// @route: GET /api/v1/bootcamp/:id
// @access: Public
const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }
  res.status("200").json({ success: true, data: bootcamp });
});

// @des:   Create Bootcamp
// @route: POST /api/v1/bootcamps
// @access: Private
const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

// @des:   Update specific bootcamp
// @route: PUT /api/v1/bootcamp/:id
// @access: Private
const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// @des:   Delete specific bootcamp
// @route: DELETE /api/v1/bootcamp/:id
// @access: Private
const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});

// @des:   Get Bootcamps by radius
// @route: GET /api/v1/radius/:zipcode/:distance
// @access: Public
const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  const loc = await geocoder.geocode(zipcode);
  const lng = loc[0].longitude;
  const lat = loc[0].latitude;

  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[-71.525909, 41.483657], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
};
