// Import necessary modules: Express for the server, Mongoose for database interaction,
// configuration settings, user-defined routes, and error handling middleware.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const setupSwagger = require('./swaggerSetup');

const config = require('./config'); // Configuration settings like port and database URI.
const userRoutes = require('./routes/userRoutes'); // Routes for user-related endpoints.
const errorHandler = require('./middlewares/errorHandler'); // Centralized error handling middleware.

// Initialize an Express application.
const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON bodies. This will make the body of incoming requests available under the req.body property.
app.use(express.json());

// Use userRoutes for any requests that start with "/api/users".
// This delegates handling of these routes to the userRoutes router.
app.use('/api/users', userRoutes);

// Global error handler middleware: catches any errors that occur during request handling.
app.use(errorHandler);

// Set up Swagger documentation
setupSwagger(app);

// Connect to MongoDB using the connection URI from the configuration settings.
// The connection options { useNewUrlParser: true, useUnifiedTopology: true } are set to avoid deprecation warnings.
mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Once the connection is successful, start the server on the configured port.
    app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
  })
  .catch(err => {
    // If the connection to MongoDB fails, log the error.
    console.error("Could not connect to MongoDB...", err);
  });
