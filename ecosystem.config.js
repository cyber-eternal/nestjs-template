/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config('./.env');

const apps = [
  {
    name: `api-${process.env.NODE_ENV}`,
    namespace: process.env.NODE_ENV,
    script: './dist/src/main.js',
    watch: false,
    instances: 1,
    exec_mode: 'cluster',
    merge_logs: true,
  },
];

console.log(JSON.stringify(apps, null, 4));

module.exports = {
  apps,
};
