const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/error");
const connectDB = require("./config/db");
const logger = require("./middlewares/logger"); // Import logger middleware
const bootcampsRoute = require("./routes/bootcamps.route"); // Bootcamp Route

// Config donenv
dotenv.config({ path: "./config/config.env" });

// Conntect to database
connectDB();

// Config App with express
const app = express();

app.use(express.json());

// User logger middleware
app.use(logger);

// Routes middlewares
app.use("/api/v1/bootcamps", bootcampsRoute);

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
