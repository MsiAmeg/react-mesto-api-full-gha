// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const { statusCode = 500, message, code } = err;

  if (code === 11000) {
    return res.status(409).send({ message: 'this email already used' });
  }

  return res.status(statusCode).send({ message: statusCode === 500 ? 'server error' : message });
};
