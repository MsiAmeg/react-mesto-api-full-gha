const { Joi } = require('celebrate');

const userMeRules = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

module.exports = userMeRules;
