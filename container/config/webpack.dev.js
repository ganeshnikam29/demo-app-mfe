const { merge } = require('webpack-merge');
const ModuleFedrationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
  devtool: 'source-map',
  plugins: [
    new ModuleFedrationPlugin({
        name: 'container',
        remotes: {
          marketing: 'marketing@http://localhost:8081/remoteEntry.js',
          authentication:'auth@http://localhost:8082/remoteEntry.js',
          dashboard: "dashboard@http://localhost:8083/remoteEntry.js"
        },
        shared: packageJson.dependencies, // Let webpack manage the shared module for you
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
