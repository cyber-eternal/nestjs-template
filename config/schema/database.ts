import { string, number } from 'joi';

export default {
  TYPEORM_TYPE: string().required().default('mysql'),
  TYPEORM_HOST: string().required(),
  TYPEORM_USERNAME: string().required(),
  TYPEORM_PASSWORD: string().required(),
  TYPEORM_DATABASE: string().required().default('docmodule'),
  TYPEORM_PORT: number().required().default(3306),
  TYPEORM_LOGGING: string().default('false'),
  TYPEORM_MIGRATIONS_RUN: string().default('true'),
  TYPEORM_SYNCHRONIZE: string().default('false'),
};
