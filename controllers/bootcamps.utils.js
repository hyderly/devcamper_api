const Bootcamp = require('../models/Bootcamp');

// @des:   Get all bootcamps
// @route: GET /api/v1/bootcamps
// @access: Public
const getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status('200').json({success: true, count: bootcamps.length, data: bootcamps})
  } catch (error) {
      res.status('400').json({success: false})
  }
  
};



// @des:   Get specific bootcamp
// @route: GET /api/v1/bootcamp/:id
// @access: Public
const getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    
    if(!bootcamp){
      return res.status(404).json({ success: false})
    }
    res.status('200').json({ success:true, data: bootcamp})
  } catch (error) {
      res.status(400).json({ success:false})
  }
  
};



// @des:   Create Bootcamp
// @route: POST /api/v1/bootcamps
// @access: Private
const createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({ success: true, data: bootcamp});
  } catch (error) {
      res.status(400).json({ success: false})
  }
  
};



// @des:   Update specific bootcamp
// @route: PUT /api/v1/bootcamp/:id
// @access: Private
const updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

    if(!bootcamp){
     return res.status(400).json({ success: false})
    }

    res.status(200).json({ success: true, data: bootcamp})
  } catch (error) {
    res.status(400).json({ success: false})
  }
};



// @des:   Delete specific bootcamp
// @route: DELETE /api/v1/bootcamp/:id
// @access: Private
const deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  
    if(!bootcamp){
      return res.status(400).json({success: false})
    }
    res.status(200).json({ success: true, data:{}})
  } catch (error) {
    res.status(400).json({ success: false})
  }
  
};

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
};
