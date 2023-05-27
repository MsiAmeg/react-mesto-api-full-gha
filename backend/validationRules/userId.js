const { Joi } = require('celebrate');

const userIdRules = {
  params: Joi.object().keys({
    id: Joi.string().hex().required().length(24),
  }),
};

module.exports = userIdRules;
