const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "mapquest",
  apiKey: "u8HMc1ApkrJ8nGBIzZoAGZekJvHspymV",
  // provider: process.env.GEOCODER_PROVIDER,
  // apikey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
