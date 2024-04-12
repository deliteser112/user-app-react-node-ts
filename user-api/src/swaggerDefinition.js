// src/swaggerDefinition.js

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'User API Documentation',
    version: '1.0.0',
    description: 'This is a sample server for a user management system.',
  },
  servers: [
    {
      url: 'http://localhost:4000/api',
      description: 'Development server',
    },
  ],
};

module.exports = swaggerDefinition;
