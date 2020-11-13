
// @des:   Get all bootcamps
// @route: GET /api/v1/bootcamps
// @access: Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({success: true, msg: 'Get all Bootcamps'});
}


// @des:   Get specific bootcamp
// @route: GET /api/v1/bootcamp/:id
// @access: Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `Get bootcamp with id ${req.params.id}`})
}


// @des:   Create Bootcamp
// @route: POST /api/v1/bootcamps
// @access: Private
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: 'Create Bootcamp'})
}


// @des:   Update specific bootcamp
// @route: PUT /api/v1/bootcamp/:id
// @access: Private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `Update bootcamp with id ${req.params.id}`})
}


// @des:   Delete specific bootcamp
// @route: DELETE /api/v1/bootcamp/:id
// @access: Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `Delete bootcamp with id ${req.params.id}`})
}
