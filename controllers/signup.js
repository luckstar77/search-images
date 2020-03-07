const services = require('../services');

module.exports = async (req, res) => {
  const result = await services.users.signup(
    req.body.username,
    req.body.password,
  );
  res.json(result);
};
