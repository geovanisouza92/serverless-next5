const jwt = require("jsonwebtoken");
const config = require("./config");

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

export function getSession(token) {
  if (!token) {
    return {};
  }
  return jwt.decode(token);
}
