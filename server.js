// External modules
const express = require("express");
const dotenv = require("dotenv");

const logger = require("./middlewares/logger");

// All routes
const bootcampsRoute = require("./routes/bootcamps");

// Config donenv
dotenv.config({ path: "./config/config.env" });

// Config App with express
const app = express();

app.use(logger);

// Routes middlewares
app.use("/api/v1/bootcamps", bootcampsRoute);

// Initialize Port
const PORT = process.env.PORT || 5000;

// Listen to Port
app.listen(PORT, () =>
  console.log(`App running in ${process.env.NODE_ENV} mode at port ${PORT}`)
);
