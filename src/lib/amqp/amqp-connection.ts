import * as Amqp from 'amqplib';
import asyncCacheAndRetry from './async-cache-and-retry';

const retryOptions = {
  retries: 20,
  maxTimeout: 300000,
  factor: 1.5,
};

export default asyncCacheAndRetry(retryOptions)(Amqp.connect);
