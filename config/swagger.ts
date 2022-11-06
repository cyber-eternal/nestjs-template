export default {
  swaggerPath: process.env.SWAGGER_PATH || '/api/doc',
  swaggerHost: process.env.SWAGGER_HOST || 'http://localhost:3000',
  swaggerUsername: process.env.SWAGGER_USER_NAME,
  swaggerPassword: process.env.SWAGGER_PASSWORD,
};
