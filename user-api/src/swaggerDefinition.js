// src/swaggerDefinition.js

const SERVER_URI= process.env.SERVER_URI || 'https://user-app-react-node-ts.onrender.com/api';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'User API Documentation',
    version: '1.0.0',
    description: 'This is a sample server for a user management system.',
  },
  servers: [
    {
      url: SERVER_URI,
      description: 'Development server',
    },
  ],
};

module.exports = swaggerDefinition;
