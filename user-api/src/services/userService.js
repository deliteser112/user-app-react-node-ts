// src/services/userService.js

// Import the User model for accessing the database.
const User = require('../models/User');

/**
 * Retrieves all users from the database.
 * @returns {Promise<Array>} A promise that resolves with an array of all user documents.
 */
const findAllUsers = async (page = 1, limit = 10) => {
  try {
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments();

    return {
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Creates a new user in the database.
 * @param {Object} userData - The data for creating a new user.
 * @returns {Promise<Object>} A promise that resolves with the newly created user document.
 */
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw error;
  }
};

/**
 * Finds a single user by their ID.
 * @param {String} id - The ID of the user to find.
 * @returns {Promise<Object>} A promise that resolves with the user document if found, otherwise rejects.
 */
const findUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Updates a user's data by their ID.
 * @param {String} id - The ID of the user to update.
 * @param {Object} updateData - The data to update the user with.
 * @returns {Promise<Object>} A promise that resolves with the updated user document.
 */
const updateUser = async (id, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes a user by their ID.
 * @param {String} id - The ID of the user to delete.
 * @returns {Promise<Object>} A promise that resolves if the user is successfully deleted, otherwise rejects.
 */
const deleteUser = async (id) => {
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      throw new Error(`User with id ${id} not found`);
    }
    return result;
  } catch (error) {
    throw error;
  }
};

// Export the service functions to make them available to other parts of the application.
module.exports = {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser
};
