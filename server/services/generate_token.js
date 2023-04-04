const jwt = require("jsonwebtoken");

exports.generateToken = (email, userId, secret, scope, expiry) =>
  jwt.sign({ email, userId, scope }, secret, expiry);
