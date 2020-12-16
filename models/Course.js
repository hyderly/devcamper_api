const mongoose = require("mongoose");
const Bootcamp = require('./Bootcamp.js')

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
    ref: "bootcamp", // ref to bootcamp collection
    required: true,
  },
});

// courseSchema.statics.getAverageCost = async function (bootcampId) {
//   console.log("Calculating Average cost");

//   const obj = await this.aggregate([
//     {
//       $match: { bootcamp: bootcampId },
//     },
//     {
//       $group: {
//         _id: "$bootcamp",
//         averageCost: { $avg: "$tuition" },
//       },
//     },
//   ]);

//   try {
//     await Bootcamp.findByIdAndUpdate(bootcampId, {
//       averageCost: obj[0].averageCost
//     });
    
//   } catch (err) {
//     console.log(err);
//   }
// };

// Call getAverageCost after save
// courseSchema.post("save", function () {
//   this.constructor.getAverageCost(this.bootcamp);
// });

// Call getAverageCost before remove
// courseSchema.pre("remove", function () {
//   this.constructor.getAverageCost(this.bootcamp);
// });

module.exports = mongoose.model("course", courseSchema);
