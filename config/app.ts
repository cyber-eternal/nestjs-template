export default {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.APP_PORT || 3000,
  servicePath: process.env.SERVICE_PATH || '/',
  swaggerHost: process.env.SWAGGER_HOST || '',
};
