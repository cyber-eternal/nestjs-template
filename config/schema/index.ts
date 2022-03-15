import * as Joi from 'joi';
import app from './app';
import database from './database';
import amqp from './amqp';
import redis from './redis';

export default Joi.types().object.keys({
  ...app,
  ...amqp,
  ...database,
  ...redis,
});
