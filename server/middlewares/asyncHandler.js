/**
 * Async handler wrapper.
 * Wraps an async Express route handler so that any rejected promise
 * is automatically forwarded to the global error handler via next().
 * Eliminates the need for try-catch blocks in every controller.
 *
 * Usage:
 *   router.get("/users", asyncHandler(async (req, res) => { ... }));
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
