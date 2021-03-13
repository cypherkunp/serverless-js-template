const Joi = require('joi');

const schema = Joi.object().keys({
  meta: Joi.object().keys({
    brand: Joi.string().required(),
    division: Joi.string().required(),
    type: Joi.string().required(),
    locale: Joi.string().required(),
    config: Joi.object().keys({
      folderName: Joi.string().allow(null, '').required(),
      fileName: Joi.string().required(),
    }),
  }),
  data: Joi.object().required(),
});

module.exports = schema;
