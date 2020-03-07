const Joi = require('joi');
const services = require('../services');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = async (req, res, next) => {
  const schema = Joi.string().required();
  const result = Joi.validate(req.headers.authorization, schema);
  if (result.error) throw new Error(result.error);

  const { payload: user } = jwt.verify(
    req.headers.authorization,
    config.SECRET_KEY,
  );
  if (!services.users.isExist(user._id))
    throw new Error('This username has not signup');

  next();
};
