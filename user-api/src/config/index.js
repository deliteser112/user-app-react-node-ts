// Load environment variables from the .env file using dotenv package.
require('dotenv').config();

/**
 * Application configuration object.
 * @type {Object}
 * @property {number} port - The port number on which the application will run. Defaults to 4000 if not specified in the environment variables.
 * @property {string} dbUri - The MongoDB connection URI obtained from the environment variables.
 */
const config = {
  // The port number for the application to listen on. Defaults to 4000 if the PORT environment variable is not set.
  port: process.env.PORT || 4000,

  // The URI used for connecting to the MongoDB database. It is retrieved from the environment variables.
  dbUri: process.env.DB_URI,
};

// Export the config object to make it accessible in other parts of the application.
module.exports = config;
