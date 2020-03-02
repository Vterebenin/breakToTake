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
    plugins: [],
    env: {
      CLIENT_ID: process.env.CLIENT_ID,
      CLIENT_SECRET: process.env.CLIENT_SECRET
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      if (dev) {
        const eslintRule = {
          test: /\.(js|tsx)?$/,
          enforce: 'pre',
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            // Emit errors as warnings for dev to not break webpack build.
            // Eslint errors are shown in console for dev, yay :-)
            emitWarning: dev,
          },
        };
        // const rules = [].concat(eslintRule, config.module.rules);
        config.module.rules.push(eslintRule)
      }

      config.resolve.alias[''] = path.resolve(__dirname)
      return config
    }
  }
};
