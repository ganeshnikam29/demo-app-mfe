const { merge } = require('webpack-merge');
const ModuleFedrationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')

const productionDomain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: 'container/latest/'
  },
  plugins: [
    new ModuleFedrationPlugin({
        name: 'container',
        remotes: {
          marketing: `marketing@${productionDomain}marketing/latest/remoteEntry.js`,
          authentication:`auth@$${productionDomain}auth/latest/remoteEntry.js`,
          dashboard: `dashboard@$${productionDomain}dashboard/latest/remoteEntry.js`
        },
        shared: packageJson.dependencies, // Let webpack manage the shared module for you
    }),
   
  ],
};

module.exports = merge(commonConfig, prodConfig);
