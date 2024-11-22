const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const tokenWithoutBearer = req.headers.authorization;
  const token = tokenWithoutBearer.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is invalid' });
    }

    // Token is valid, decoded contains the payload data
    req.user = decoded;

    next();
  });
}

module.exports = verifyToken;
