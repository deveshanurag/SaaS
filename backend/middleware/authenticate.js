const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticate;
