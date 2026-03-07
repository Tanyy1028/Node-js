/**
 * Async error handler wrapper
 * Catches async errors and passes them to the next middleware
 * @param {Function} fn - Async function to wrap
 */
export const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

