const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {

  console.log("AUTH MIDDLEWARE HIT");

  const authHeader = req.header("Authorization");

  console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {
    return res.status(401).json({
      message: "No token"
    });
  }

  try {

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED:", decoded);

    req.user = decoded.id;

    next();

  } catch (err) {

    console.log("JWT ERROR:", err);

    res.status(401).json({
      message: "Token invalid"
    });

  }

};