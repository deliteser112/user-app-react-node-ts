// src/routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');
const { userCreationRules, validate } = require('../middlewares/userValidation');

const router = express.Router();

/**
 * Route serving a list of all users.
 */

router.get('/', userController.getAllUsers);

/**
 * Route for creating a new user.
 */
router.post('/', userCreationRules(), validate, userController.createUser);

/**
 * Route serving a specific user by their ID.
 */
router.get('/:id', userController.getUserById);

/**
 * Route for updating a user's information by their ID.
 */
router.put('/:id', userCreationRules(), validate, userController.updateUser);

/**
 * Route for deleting a user by their ID.
 */
router.delete('/:id', userController.deleteUser);

// Export the router to make it available to the rest of the application.
module.exports = router;
