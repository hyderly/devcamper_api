const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Bootcamp = require("../models/Bootcamp");
const geocoder = require("../utils/geocoder");

// @des:   Get all bootcamps
// @route: GET /api/v1/bootcamps
// Also add Filter, select, sorting and pagination
// @access: Public
const getBootcamps = asyncHandler(async (req, res, next) => {
  res.status("200").json(res.advancedResults);
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
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }

  bootcamp.remove();

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

  // Get radius: divide distance by radius of earth
  // Earth radius 3963 miles / 6,371 km
  const radius = distance / 6371;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

// @des:   PUT Upload photo for bootcamp
// @route: GET /api/v1/bootcamp/:id/photo
// @access: Private
const uploadBootcampPhoto = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload File`, 400));
  }

  // get file which uploaded through postmen
  const file = req.files.file;

  // Check file type
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload file size less than ${process.env.MAX_FILE_UPLOAD}`
      )
    );
  }

  // Create custom file name
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  // Move file to file upload path
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse("Error with file upload", 500));
    }

    // Update Bootcamp photo field
    await Bootcamp.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    });

    // Send Response
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  uploadBootcampPhoto,
};
