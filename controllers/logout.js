const services = require('../services');

module.exports = async (req, res) => {
  await services.token.create(req.headers.authorization);
  res.status(200).end();
};
