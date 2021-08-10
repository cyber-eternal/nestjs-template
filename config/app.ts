export default {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.APP_PORT || 3000,
  swaggerHost: process.env.SWAGGER_HOST || '',
  swaggerPath: process.env.SWAGGER_PATH || '/api/doc',
};
