// Load environment variables from the .env file using dotenv package.
require('dotenv').config();

/**
 * Application configuration object.
 * @type {Object}
 * @property {number} port - The port number on which the application will run. Defaults to 4000 if not specified in the environment variables.
 * @property {string} dbUri - The MongoDB connection URI obtained from the environment variables.
 */
const config = {
  port: process.env.PORT || 4000,
  dbUri: process.env.DB_URI || 'mongodb+srv://deliteser112:kzlH61d6JjXl9g4I@deliteser.tlh8y7k.mongodb.net/user',
  // dbUri: process.env.DB_URI || 'mongodb://localhost:27017/user',
};

module.exports = config;
