const services = require('../services');

module.exports = async (req, res, next) => {
  if (await services.token.isExist(req.headers.authorization))
    throw new Error('This token has been revoked');

  next();
};
