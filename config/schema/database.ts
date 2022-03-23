import * as Joi from 'joi';

export default {
  TYPEORM_TYPE: Joi.string().required().default('mysql'),
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required().default('docmodule'),
  TYPEORM_PORT: Joi.number().required().default(3306),
  TYPEORM_LOGGING: Joi.string().default('false'),
  TYPEORM_MIGRATIONS_RUN: Joi.string().default('true'),
  TYPEORM_SYNCHRONIZE: Joi.string().default('false'),
};
