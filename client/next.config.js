const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');



module.exports = () => {
  const env = dotenv.config().parsed

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    plugins: [new webpack.DefinePlugin(envKeys)],
    env: {
      CLIENT_ID: process.env.CLIENT_ID,
      CLIENT_SECRET: process.env.CLIENT_SECRET
    },
    webpack: config => {
      config.resolve.alias[''] = path.resolve(__dirname);
      return config;
    }
  }
};
