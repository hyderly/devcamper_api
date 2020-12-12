const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add course title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please add course description"],
  },
  weeks: {
    type: String,
    required: [true, "Please add weeks required"],
  },
  tuition: {
    type: Number,
    required: [true, "Please add tuition fees"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add minimum skill"],
  },
  scholarhipsAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bootcamp",
    required: true,
  },
});

module.exports = mongoose.model("course", courseSchema);
