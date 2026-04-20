/**
 * Role-Based Access Control (RBAC) middleware.
 *
 * Factory function that returns middleware which checks if the
 * authenticated user's role is in the allowed list.
 *
 * Must be used AFTER verifyAccessToken (which sets req.user).
 *
 * Usage:
 *   router.post("/rooms", verifyAccessToken, authorizeRoles("admin"), controller);
 *   router.get("/leaves", verifyAccessToken, authorizeRoles("admin", "warden"), controller);
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden. You do not have permission to perform this action.",
      });
    }
    next();
  };
};

export default authorizeRoles;
