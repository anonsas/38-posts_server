const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.header('accessToken');
  if (!accessToken) return res.json({ error: 'User not logged in' });

  try {
    const validToken = verify(accessToken, process.env.JWT_ACCESS_TOKEN);
    console.log(validToken);
    req.user = validToken;

    if (validToken) {
      return next();
    }
  } catch (error) {
    return res.json({ error: error });
  }
};

module.exports = { validateToken };

// If user is not authenticated, we get: Object with ERROR.
// If user is authenticated, we get: Object with USER.

// req.user.iat
// req.user.id
// req.user.username
