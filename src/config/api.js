// src/config/api.js
require('dotenv').config();

module.exports = {
  GOOGLE_PLACES_BASE_URL: 'https://maps.googleapis.com/maps/api/place',
  GOOGLE_APP_API_KEY: process.env.GOOGLE_API_KEY,
  GOOGLE_PLACES_GET_LIMIT: 1,
};
