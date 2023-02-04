import * as Joi from 'joi';

export default {
  REDIS_HOST: Joi.string(),
  REDIS_PORT: Joi.number(),
  REDIS_DB: Joi.number(),
  REDIS_PASSWORD: Joi.string(),
  REDIS_KEY_S3: Joi.string(),
  REDIS_KEY_SP: Joi.string(),
  REDIS_PREFIX: Joi.string(),
};
