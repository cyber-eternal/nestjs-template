import * as Joi from 'joi';

export default {
  NODE_ENV: Joi.string().valid('dev', 'prod', 'test', 'stage').default('dev'),
  PORT: Joi.number().default(3000),
};
