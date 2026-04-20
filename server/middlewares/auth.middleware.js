import jwt from "jsonwebtoken";

/**
 * Verify JWT Access Token middleware.
 *
 * Expects the token in the `Authorization` header as:
 *   Authorization: Bearer <accessToken>
 *
 * On success, attaches `req.user = { userId, role }` and calls next().
 * On failure, responds with 401 Unauthorized.
 */
const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    // Differentiate between expired and malformed tokens
    const message =
      error.name === "TokenExpiredError"
        ? "Access token has expired. Please refresh."
        : "Invalid access token.";
    return res.status(401).json({ success: false, message });
  }
};

export default verifyAccessToken;
