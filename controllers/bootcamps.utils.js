// @des:   Get all bootcamps
// @route: GET /api/v1/bootcamps
// @access: Public
const getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Get all Bootcamps" });
};

// @des:   Get specific bootcamp
// @route: GET /api/v1/bootcamp/:id
// @access: Public
const getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Get bootcamp with id ${req.params.id}` });
};

// @des:   Create Bootcamp
// @route: POST /api/v1/bootcamps
// @access: Private
const createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Create Bootcamp" });
};

// @des:   Update specific bootcamp
// @route: PUT /api/v1/bootcamp/:id
// @access: Private
const updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp with id ${req.params.id}` });
};

// @des:   Delete specific bootcamp
// @route: DELETE /api/v1/bootcamp/:id
// @access: Private
const deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp with id ${req.params.id}` });
};

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
};
