const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");
const Course = require("./Course");
const key = require("../utils/geocoder");

// match: we can only put relavent data thats match regex
// trim : remove blank spaces
// slug: create user-friendly link for user, using name
// enum: only put data from the array, enum: ['2233', '233', '3344']

const bootcampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is must"],
      unique: true,
      trim: true,
      maxlength: [50, "Name must not be more than 50 characters"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Description is must"],
      maxlength: [500, "Description must not be more than 500 characters"],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    phone: {
      type: String,
      maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      // GeoJSON Points
      type: {
        type: String,
        enum: ["points"], // emun : only available values
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },

    careers: {
      type: [String],
      required: true,
      enum: [
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Data Science",
        "Business",
        "Other",
      ],
    },
    averageRating: {
      type: Number,
      min: [1, "Minimum rating should be 1"],
      max: [10, "Maximum rating should not more than 10"],
    },
    averageCost: Number,
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    housing: {
      type: Boolean,
      default: false,
    },
    jobAssistance: {
      type: Boolean,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    acceptGi: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // ref to user collection
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create Slugify using mongoose middleware
bootcampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Create location using geocoder and mapquest
bootcampSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);

  this.location = {
    type: "points",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zip: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  // Don't save address in database
  this.address = undefined;

  next();
});

// If a bootcamps remove all associated courses will automatically delete
bootcampSchema.pre("remove", async function (next) {
  console.log(
    `All courses beign deleted that associated with bootcamp ${this.name}`
  );
  await Course.deleteMany({ bootcamp: this.id });
  next();
});

// Virtual for reverse poplute courses into bootcamp
bootcampSchema.virtual("courses", {
  ref: "course", // ref to course collection
  localField: "_id",
  foreignField: "bootcamp",
  justOne: false,
});

module.exports = mongoose.model("bootcamp", bootcampSchema);
