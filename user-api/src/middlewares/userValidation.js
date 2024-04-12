// src/middlewares/userValidation.js

const { body, validationResult } = require('express-validator');

// Define validation rules for a new user
const userCreationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
  ];
};

// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

module.exports = {
  userCreationRules,
  validate,
};
