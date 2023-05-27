const { Joi } = require('celebrate');

const cardIdRules = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
};

module.exports = cardIdRules;
