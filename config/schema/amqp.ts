import * as Joi from 'joi';

export default {
  AMQP_HOST: Joi.string(),
  AMQP_PORT: Joi.number(),
  AMQP_USERNAME: Joi.string(),
  AMQP_PASSWORD: Joi.string(),
  AMQP_VHOST: Joi.string().uri(),
  AMQP_QUEUE_PREFIX: Joi.string(),
  AMQP_SEND_EMAIL_QUEUE: Joi.string(),
};
