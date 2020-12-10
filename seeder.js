const fs = require("fs");
const mongoose = require("mongoose");

// Import dotenv
const dotenv = require("dotenv");

// Import Models
const Bootcamp = require("./models/Bootcamp");

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

// Get bootcamps data
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// Import data to Database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
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
