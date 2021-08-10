import { object as joiObject } from 'joi';
import app from './app';
import database from './database';
import amqp from './amqp';

export default joiObject({
  ...app,
  ...amqp,
  ...database,
});
