import { string, number } from 'joi';

export default {
  NODE_ENV: string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: number().default(3000),
};
