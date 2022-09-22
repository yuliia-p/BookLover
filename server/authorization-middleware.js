const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  const token = req.get('X-Access-Token');
  if (!token) {
    throw new ClientError(401, 'authentication required');
  } else {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = payload;
    next();
  }
}

module.exports = authorizationMiddleware;
