const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is defined in your .env file

    // Attach user ID to request for further use
    req.userId = decoded.userId;
    next();
  } catch (err) {
    // Handle invalid token
    return res.status(403).json({ error: 'Forbidden: Invalid token' });
  }
};

module.exports = authenticateUser;

