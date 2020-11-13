const express = require('express');
const dotenv = require('dotenv');

// All routes
const bootcamps = require('./routes/bootcamps');

// get config variables
dotenv.config({path: './config/config.env'});

const app = express();


app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App running in ${process.env.NODE_ENV} mode at port ${PORT}`));