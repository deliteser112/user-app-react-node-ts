// src/swaggerSetup.js

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swaggerDefinition');

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./api-docs/paths/*.yaml', './api-docs/components/*.yaml'],
};

const swaggerSpec = swaggerJsdoc(options);

function setup(app) {
  // Serve Swagger docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setup;
