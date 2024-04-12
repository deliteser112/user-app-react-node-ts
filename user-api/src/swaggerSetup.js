// src/swaggerSetup.js

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swaggerDefinition');

const options = {
  swaggerDefinition,
  apis: ['./api-docs/paths/*.yaml', './api-docs/components/*.yaml'],
};

const swaggerSpec = swaggerJsdoc(options);

function setup(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setup;
