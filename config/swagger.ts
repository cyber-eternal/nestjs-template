export default {
  swaggerPath: process.env.SWAGGER_PATH || '/api/doc',
  swaggerHost: process.env.SWAGGER_HOST || 'http://localhost:3000',
  oAuth2RedirectFilePath: process.env.OAUTH2_REDIRECT_FILE_PATH || '',
};
