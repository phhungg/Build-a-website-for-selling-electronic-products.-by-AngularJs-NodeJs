const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, "seceret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send({ error: "Invalid token." });
  }
}
function roleAdmin(req, res, next) {
  if (req.user && req.user.role) {
    next();
  } else {
    return res.status(403).send({ error: "Bạn không phải là Admin." });
  }
}
module.exports = { verifyToken, roleAdmin };
