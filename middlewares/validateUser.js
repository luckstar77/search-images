const Joi = require('joi');

module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  const result = Joi.validate(req.body, schema);

  if (result.error) throw new Error(result.error);

  next();
};
