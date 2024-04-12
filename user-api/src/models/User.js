// Import the mongoose module to interact with the MongoDB database.
const mongoose = require('mongoose');

/**
 * Defines the schema for the User model.
 * This schema represents how user data is organized in the MongoDB database.
 * 
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

/**
 * Compiles the User model from the schema.
 * The model represents a collection of users in the database and allows us to interact with that collection.
 * 
 * @type {mongoose.Model}
 */
const User = mongoose.model('User', userSchema);

// Export the User model to make it accessible in other parts of the application.
module.exports = User;
