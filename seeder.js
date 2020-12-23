const fs = require("fs");
const mongoose = require("mongoose");

// Import dotenv
const dotenv = require("dotenv");

// Import Models
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");
const User = require("./models/User");

// Config global variables
dotenv.config({ path: "./config/config.env" });

// Connect to Database
// we connect database in seeder file because
// we don't run 'npm run dev' seeder file runs its own database and connect it
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Get Bootcamps data
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
// Get Courses data
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);
// Get User data
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

// Import data to Database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await User.create(users)
    console.log("Data Imported...");

    process.exit();
  } catch (err) {
    console.log(err.message);
  }
};

// Delete data from the Database
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Import Or Destroyed Data
// process.argv is 'node seeder -i or -d'
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
