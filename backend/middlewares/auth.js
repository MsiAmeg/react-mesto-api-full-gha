const Jwt = require('jsonwebtoken');
const config = require('../config');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    return next(new UnauthorizedError('sign in to access this resource'));
  }

  let payload;
  try {
    payload = Jwt.verify(jwt, NODE_ENV === 'production' ? SECRET_KEY : config.SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError('sign in to access this resource'));
  }

  req.user = payload;
  return next();
};
