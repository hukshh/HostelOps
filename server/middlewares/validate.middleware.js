/**
 * Zod validation middleware factory.
 *
 * Takes a Zod schema and returns Express middleware that validates
 * req.body against it. On failure, the ZodError is passed to the
 * global error handler (which formats it nicely).
 *
 * Usage:
 *   import { registerSchema } from "../validations/auth.validation.js";
 *
 *   router.post("/register", validate(registerSchema), controller);
 */
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    // Forward the ZodError to the global error handler
    return next(result.error);
  }

  // Replace req.body with the parsed (and potentially transformed) data
  req.body = result.data;
  next();
};

export default validate;
