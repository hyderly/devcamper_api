const express = require("express");
const dotenv = require("dotenv"); // dotenv for global variable
const path = require("path");
const fileupload = require("express-fileupload"); // express-fileupload package

const errorHandler = require("./middlewares/error"); // custom error handlers
const connectDB = require("./config/db"); // database connection
const logger = require("./middlewares/logger"); // Import logger middleware

const bootcampsRoute = require("./routes/bootcamps"); // Bootcamps Route
const coursesRoute = require("./routes/courses"); // Courses Route
const authRoute = require("./routes/auth");

// Config donenv
dotenv.config({ path: "./config/config.env" });

// Conntect to database
connectDB();

// Config App with express
const app = express();

app.use(express.json());

// Set Static Folder
app.use(express.static(path.join(__dirname, "Public")));

// User logger middleware
app.use(logger);

app.use(fileupload());

// Routes middlewares
app.use("/api/v1/bootcamps", bootcampsRoute);
app.use("/api/v1/courses", coursesRoute);
app.use("/api/v1/auth", authRoute);

// ErrorHandler Custom Middleware
app.use(errorHandler);

// Initialize Port
const PORT = process.env.PORT || 5000;

// Listen to Port
app.listen(PORT, () =>
  console.log(`App running in ${process.env.NODE_ENV} mode at port ${PORT}`)
);

// Handling UnHandledRejections
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`Error: ${err.message}`);
//   server.close(process.exit(1));
// })
