import { RedisModuleOptions } from 'nestjs-redis';

export default {
  name: 'redis-cache',
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  db: parseInt(process.env.REDIS_DB, 10) || 1,
  password: process.env.REDIS_PASSWORD || 'sOmE_sEcUrE_pAsS',
  exampleKey: process.env.REDIS_KEY_S3 || 'example-cache', // documents-cache is a old key. Leave it to not brock the current cache
  keyPrefix: process.env.REDIS_PREFIX || '',
} as RedisModuleOptions;
