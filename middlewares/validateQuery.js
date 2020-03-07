const Joi = require('joi');

module.exports = async (req, res, next) => {
  const schema = Joi.object().keys({
    key: Joi.string().required(),
  });
  const result = Joi.validate(req.query, schema);

  if (result.error) throw new Error(result.error);

  next();
};
