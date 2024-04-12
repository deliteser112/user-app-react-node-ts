/**
 * Error handling middleware for Express applications.
 * This middleware function captures any errors that occur during the handling of requests.
 * It logs the error stack for debugging purposes and sends a generic error response to the client.
 */
module.exports = (err, req, res, next) => {
  // Log the error stack for debugging purposes. This is helpful for identifying the source of the error.
  console.error(err.stack);

  // Send a generic error response to the client with a 500 Internal Server Error status code.
  // In production applications, consider not sending error details to the client to avoid exposing sensitive information.
  res.status(500).send('Something broke!');
};
