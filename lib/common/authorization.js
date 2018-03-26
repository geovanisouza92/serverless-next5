const jwt = require("jsonwebtoken");
const config = require("./config");

/**
 * Check if the token is valid and authorized to continue
 *
 * @param {String} token Autorization token
 */
export function isAuthorized(token) {
  if (!token) {
    return false;
  }
  try {
    return jwt.verify(token, config.TOKEN_SECRET);
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * Decode session data from JWT token
 */
export function getSession(token) {
  if (!token) {
    return {};
  }
  return jwt.decode(token);
}
