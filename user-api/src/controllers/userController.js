// src/controllers/userController.js

const userService = require('../services/userService');

/**
 * Retrieves all users from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with the users data.
 */
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const result = await userService.findAllUsers(parseInt(page), parseInt(limit));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

/**
 * Creates a new user in the database.
 * @param {Object} req - The request object containing the user details in the body.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with the newly created user data.
 */
exports.createUser = async (req, res) => {
  try {
    // Create a user with the provided data in the request body
    const newUser = await userService.createUser(req.body);
    // Respond with the newly created user and a 201 status code
    res.status(201).json(newUser);
  } catch (err) {
    // Handle validation errors or other errors
    res.status(400).json({ message: "Failed to create user", error: err.message });
  }
};

/**
 * Retrieves a single user by their ID.
 * @param {Object} req - The request object, including the user's ID in the params.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with the requested user data.
 */
exports.getUserById = async (req, res) => {
  try {
    // Fetch the user with the specified ID
    const user = await userService.findUserById(req.params.id);
    res.json(user);
  } catch (err) {
    // Distinguish between not found errors and other server errors
    if (err.message.includes('not found')) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Failed to fetch user", error: err.message });
    }
  }
};

/**
 * Updates a user by their ID with provided data.
 * @param {Object} req - The request object, including the user's ID in the params and update data in the body.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with the updated user data.
 */
exports.updateUser = async (req, res) => {
  try {
    // Update the user with the specified ID and provided data
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    // Handle not found or validation errors
    if (err.message.includes('not found')) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(400).json({ message: "Failed to update user", error: err.message });
    }
  }
};

/**
 * Deletes a user by their ID.
 * @param {Object} req - The request object, including the user's ID in the params.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the user is successfully deleted.
 */
exports.deleteUser = async (req, res) => {
  try {
    // Delete the user with the specified ID
    await userService.deleteUser(req.params.id);
    // Respond with no content status to indicate successful deletion
    res.status(204).send();
  } catch (err) {
    // Handle not found errors distinctly from other errors
    if (err.message.includes('not found')) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Failed to delete user", error: err.message });
    }
  }
};
