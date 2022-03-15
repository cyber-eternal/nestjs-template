export default {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.APP_PORT || 3000,
  version: process.env.npm_package_version || '1.0',
};
