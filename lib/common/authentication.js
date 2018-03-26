const jwt = require("jsonwebtoken");
const config = require("./config");

/**
 * Executes authentication logic
 */
export function authenticate(username, password) {
  if (username === "admin@example.com" && password === "admin") {
    const session = { sub: username };
    return jwt.sign(session, config.TOKEN_SECRET, config.TOKEN_OPTIONS);
  }
  return null;
}
