const { Joi } = require('celebrate');
const config = require('../config');

const createCardRules = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(new RegExp(config.URL_PATTERN)),
  }),
};
module.exports = createCardRules;
