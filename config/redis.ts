import { RedisModuleOptions } from 'nestjs-redis';

export default {
  name: 'redis-cache',
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  db: parseInt(process.env.REDIS_DB, 10) || 1,
  password: process.env.REDIS_PASSWORD || 'sOmE_sEcUrE_pAsS',
} as RedisModuleOptions;
