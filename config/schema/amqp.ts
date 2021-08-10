import { number, string } from 'joi';

export default {
  AMQP_HOST: string().required(),
  AMQP_PORT: number(),
  AMQP_USERNAME: string().required(),
  AMQP_PASSWORD: string().required(),
  AMQP_VHOST: string().uri(),
  AMQP_QUEUE_PREFIX: string(),
  AMQP_SEND_EMAIL_QUEUE: string(),
};
