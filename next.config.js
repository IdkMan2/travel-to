const { PHASE_PRODUCTION_BUILD } = require('next/constants');
const ESLintPlugin = require('eslint-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const withPlugins = require('next-compose-plugins');

const config = {
  pageExtensions: ['tsx', 'ts'],
  webpack(webpackConfig, {dev: isDevelopment}) {

    if(isDevelopment) {
      webpackConfig.plugins.push(
        new ESLintPlugin({
          extensions: ['ts', 'tsx'],
        })
      );
    }

    return webpackConfig;
  },
};

module.exports = withPlugins([
  [withBundleAnalyzer({enabled: true}), {}, [PHASE_PRODUCTION_BUILD]],
], config);
