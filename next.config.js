const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const ESLintPlugin = require('eslint-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer');

module.exports = (phase, { defaultConfig }) => {
  const isDevelopment = phase === PHASE_DEVELOPMENT_SERVER;

  const config = {
    ...defaultConfig,
    pageExtensions: ['tsx', 'ts'],
  };

  config.webpack = (webpackConfig) => {
    if(isDevelopment) {
      webpackConfig.plugins.push(
        new ESLintPlugin({
          extensions: ['ts', 'tsx'],
        })
      );
    }

    return webpackConfig;
  };

  return withBundleAnalyzer({enabled: !isDevelopment})(defaultConfig);
}
