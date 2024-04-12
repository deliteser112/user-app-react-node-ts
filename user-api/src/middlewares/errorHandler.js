/**
 * Error handling middleware for Express applications.
 * This middleware function captures any errors that occur during the handling of requests.
 * It logs the error stack for debugging purposes and sends a generic error response to the client.
 */
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};
