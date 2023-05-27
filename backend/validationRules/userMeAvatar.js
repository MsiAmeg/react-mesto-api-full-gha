const { Joi } = require('celebrate');
const config = require('../config');

const userMeAvatarRules = {
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(new RegExp(config.URL_PATTERN)),
  }),
};

module.exports = userMeAvatarRules;
