

/**
 * Middleware function for handling the response of the request.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * 
 * @property {string} req.error_message - The error message, if any, from the request.
 * 
 * @returns {Object} - If there is an error message, it returns an object with the error status and the error message.
 *                     If there is no error message, it sets the response status to 200 and passes control to the next middleware function.
 */
const responseMiddleware = (req, res, next) => {
  // DONE: Implement middleware that returns result of the query
  if (req.error_message) {
    if(req.error_message === "User not found" || req.error_message === "Fighter not found!"){
      res.status(404).send({ error: true, message: req.error_message });
    }
    else{
      res.status(400).send({ error: true, message: req.error_message });
    }
  }
  else{
    res.status(200);
    next();
  }
};

export { responseMiddleware };
